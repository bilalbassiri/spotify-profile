import React, { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-js';
import { getDur } from '../../../utils/heplers';
import Chart from './Chart';
import Loading from '../../Loading'
import PeopleIcon from '@material-ui/icons/People';
import AlbumIcon from '@material-ui/icons/Album';
import EventNoteIcon from '@material-ui/icons/EventNote';
import HistoryIcon from '@material-ui/icons/History';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonIcon from '@material-ui/icons/Person';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const spotify = new SpotifyWebApi();



function TrackFeatures({ track, played_at, added_at }) {
    document.title = 'Spotify Profile - ' + track?.name;
    const { id, album, artists } = track;
    const [features, setFeatures] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {
        spotify.getAudioFeaturesForTrack(id).then(_features => setFeatures(_features))
        spotify.containsMySavedTracks([id]).then(res => setIsSaved(res[0]))
    }, [id])
    const BgImage = {
        background: `url(${track?.album.images[0].url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'norepeat'
    }
    const Icon = {
        marginRight: '5px',
        fontSize: '1rem'
    }
    return (
        features.valence ?
            <div className='audio-features-for-track' style={BgImage}>
                <h3 className='main-title' style={{ position: 'absolute', zIndex: '1' }}>Track</h3>
                <div className='container'>
                    <FavoriteIcon style={{ display: isSaved ? 'block' : 'none' }} className='is-saved-icon' />
                    <img src={album.images[0].url} alt={track.album.name} className='track-poster' />
                    <div className='feautures'>
                        <a href={track.external_urls.spotify} target='_blank' rel="noreferrer">
                            <h4 className='title'>{track.name}</h4>
                        </a>
                        <table className='details'>
                            <tbody>
                                <tr>
                                    <td>{artists.length === 1 ? <PersonIcon style={Icon} /> : <PeopleIcon style={Icon} />} Artist{artists.length === 1 ? '' : 's'}</td>
                                    <td>
                                        <ul>
                                            {artists?.map((x, i) => (
                                                <li key={i}> <a href={x.external_urls.spotify} target='_blank' rel="noreferrer">{x.name}</a></li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td><AlbumIcon style={Icon} />Album</td>
                                    <td>{album.name}</td>
                                </tr>
                                <tr>
                                    <td><AccessTimeIcon style={Icon} />Duration</td>
                                    <td>{Math.floor((track.duration_ms) / 60000) + ':' + getDur((track.duration_ms) % 60000)}</td>
                                </tr>
                                <tr>
                                    <td><TrendingUpIcon style={Icon} />Popularity</td>
                                    <td>{track.popularity}%</td>
                                </tr>
                                {added_at ?
                                    <tr>
                                        <td><FavoriteIcon style={Icon} />Liked at</td>
                                        <td>{new Date(added_at).toDateString()}</td>
                                    </tr> : null}
                                {played_at ?
                                    <tr>
                                        <td><HistoryIcon style={Icon} />Played at</td>
                                        <td>{new Date(played_at).toDateString()}</td>
                                    </tr> : null}
                                <tr>
                                    <td><EventNoteIcon style={Icon} />Release date</td>
                                    <td>{new Date(album.release_date).toDateString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Chart features={features} />
                </div>
            </div>
            :
            <Loading />
    )
}

export default TrackFeatures
