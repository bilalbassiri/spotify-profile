import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import EventNoteIcon from '@material-ui/icons/EventNote';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PersonIcon from '@material-ui/icons/Person';

let Album = ({ album: item }) => {
    const { album } = item;
    document.title = 'Spotify Profile - ' + album?.name;
    const BgImage = {
        background: `url(${album?.images[0].url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'norepeat'
    }
    const Icon = {
        marginRight: '5px',
        fontSize: '1rem'
    }
    return (
        <div className='album' style={BgImage}>
            <h3 className='main-title' style={{ position: 'absolute' }}>Album</h3>
            <div className='container'>
                <img src={album.images[0]?.url} className='poster' alt={album.name} />
                <a href={album.external_urls.spotify} target='_blank' rel="noreferrer">
                    <h4 className='name'>{album.name}</h4>
                </a>
                <table className='details'>
                    <tbody>
                        <tr>
                            <td>{album.artists.length === 1 ? <PersonIcon style={Icon} /> : <PeopleIcon style={Icon} />} Artist{album.artists.length === 1 ? '' : 's'}</td>
                            <td>
                                <ul>
                                    {album.artists?.map((x, i) => (
                                        <li key={i}> <a href={x.external_urls.spotify} target='_blank' rel="noreferrer">{x.name}</a></li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td><MusicNoteIcon style={Icon} /> Total tracks</td>
                            <td>{album.total_tracks}</td>
                        </tr>
                        <tr>
                            <td><TrendingUpIcon style={Icon} /> Popularity</td>
                            <td>{album.popularity}%</td>
                        </tr>
                        <tr>
                            <td>
                                <AddCircleOutlineIcon style={Icon} /> Added at
                        </td>
                            <td>
                                {new Date(item.added_at).toDateString()}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <EventNoteIcon style={Icon} /> Release date
                        </td>
                            <td>
                                {new Date(album.release_date).toDateString()}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Album
