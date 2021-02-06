import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { getFormatedFollowers, getDur, getDisplay } from '../../../utils/heplers'
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PersonIcon from '@material-ui/icons/Person';
import Loading from '../../Loading';

const spotify = new SpotifyWebApi();


let Artist = ({ artist, country }) => {
    document.title = 'Spotify Profile - ' + artist?.name;
    const [popular, setPopular] = useState([]);
    const [flex, setFlex] = useState('none');
    const [imFollowing, setImFollowing] = useState(null)
    useEffect(() => {
        spotify.getArtistTopTracks(artist.id, country).then(({ tracks }) => setPopular(tracks))
        spotify.isFollowingArtists([artist.id]).then(logic => setImFollowing(logic[0]))
    }, [artist.id, country])
    const BgImage = {
        background: `url(${artist?.images[0].url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }
    return (
        popular.length && imFollowing !== null ?
            <div className='artist' style={BgImage}>
                <h3 className='main-title' style={{ position: 'absolute' }}>Artist</h3>
                <div className='container'>
                    <img src={artist.images[0]?.url} className='poster' alt={artist.name} />
                    <a href={artist.external_urls.spotify} target='_blank' rel="noreferrer">
                        <h4 className='name'>{artist.name}</h4>
                    </a>
                    <div className='followers'>
                        <PersonIcon style={{ marginRight: '3px', fontSize: '1.1rem' }}/> {getFormatedFollowers(artist.followers.total)}
                    </div>
                    <table className='details'>
                        <tbody>
                            <tr>
                                <td>Am I following?</td>
                                <td>{imFollowing ? 'Yes' : 'No'}</td>
                            </tr>
                            <tr>
                                <td>Popularity</td>
                                <td>{artist.popularity}%</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='popular'>
                        <h2 className='title'><TrendingUpIcon style={{ color: '#7c6cce', marginRight: '10px' }} />Popular</h2>

                        {
                            popular?.map((track, i) => (
                                <div className='track' key={track.id} style={getDisplay(i, flex)}>
                                    <div className='disc-num'>
                                        {i + 1}
                                    </div>
                                    <img src={track.album.images[0]?.url} alt={track.name} />
                                    <h3>
                                        <a href={track.external_urls.spotify} target="_blank" rel='noreferrer' className='title'>
                                            {track.name}
                                        </a>
                                    </h3>
                                    <div className='duration'>{Math.floor((track.duration_ms) / 60000) + ':' + getDur((track.duration_ms) % 60000)}</div>
                                </div>
                            ))
                        }
                        <div className='show' style={(popular?.length) <= 5 ? { display: 'none' } : { display: 'grid' }} onClick={(e) => {
                            setFlex(flex === 'none' ? 'flex' : 'none')
                        }}>
                            {flex === 'none' ? <UnfoldMoreIcon className='unfold' /> : <UnfoldLessIcon className='unfold' />}
                        </div>
                    </div>
                </div>
            </div>
            :
            <Loading isLarge />
    )
}

export default Artist
