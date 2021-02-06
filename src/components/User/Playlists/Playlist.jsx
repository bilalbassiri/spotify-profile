import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Loading from '../../Loading'
import FavoriteIcon from '@material-ui/icons/Favorite';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { getFormatedFollowers, getPlaylistFormattedDur } from '../../../utils/heplers';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

const spotify = new SpotifyWebApi();

function Playlist({ id }) {
    const [playlist, setPlaylist] = useState({});
    const [isFormatted, setIsFormatted] = useState(false);
    useEffect(() => {
        spotify.getPlaylist(id).then(res => {
            setPlaylist(res)
        })
    }, [id])
    document.title = playlist?.name ? 'Spotify Profile - ' + playlist.name : 'Spotify Profile';

    let getPlaylistDuration = () => {
        let tt = 0;
        playlist?.tracks?.items?.forEach(({ track: { duration_ms } }) => tt += duration_ms);
        return tt;
    }
    let imgUrl = playlist?.images?.length ? playlist.images[0].url : null;
    const BgImage = {
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'norepeat'
    }, IconPrp = { color: '#7c6cce', marginRight: '5px', fontSize: '1.4rem' };

    return (
        playlist.name ?
            <div className='playlist' style={BgImage}>
                <h3 className='main-title' style={{ position: 'absolute' }}>{playlist.type}</h3>
                <div className='container'>
                    {playlist?.images?.length
                        ?
                        <img src={imgUrl} className='poster' alt={playlist.name} />
                        :
                        <div className='pseudo-img'></div>}
                    <a href={playlist.external_urls?.spotify} target='_blank' rel="noreferrer">
                        <h4 className='name'>{playlist.name}</h4>
                    </a>
                    <p className='des'>
                        {
                            playlist.description.replace('&quot;', '"').replace('&quot;', '"').replace('&amp;', '&')
                        }
                    </p>
                    <div className='numbers'>
                        <div>
                            <FavoriteIcon
                                style={IconPrp} />
                            <span>
                                {getFormatedFollowers(playlist.followers?.total ? playlist.followers?.total : 0)}
                            </span>
                        </div>
                        <div>
                            <MusicNoteIcon
                                style={IconPrp} />
                            <span>
                                {playlist.tracks?.total}
                            </span>
                        </div>
                        <div onClick={() => setIsFormatted(!isFormatted)}>
                            <QueryBuilderIcon
                                style={IconPrp} />
                            <span>
                                {
                                    getPlaylistFormattedDur(getPlaylistDuration(), isFormatted)
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            :
            <Loading isLarge />
    )
}

export default Playlist
