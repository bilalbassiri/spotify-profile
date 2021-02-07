import React, { useState, useEffect } from 'react';
import AlbumIcon from '@material-ui/icons/Album';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import GroupIcon from '@material-ui/icons/Group';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import GitHubIcon from '@material-ui/icons/GitHub';
import Avatar from '@material-ui/core/Avatar';
import SpotifyIcon from '../img/Spotify_Icon_RGB_Green.png';
import { useHistory } from "react-router-dom";


let Menu = ({ avatar, name }) => {
    avatar = (avatar && avatar.length) ? avatar[0].url : null;
    let history = useHistory();
    const [isActive, setActive] = useState(undefined);
    useEffect(() => {
        let getActivePage = (_path) => {
            _path = _path.split('/')[1];
            switch (_path) {
                case 'playlists':
                    setActive('playlists');
                    break;
                case 'albums':
                    setActive('albums');
                    break;
                case 'top-artists':
                    setActive('top-artists');
                    break;
                case 'top-tracks':
                    setActive('top-tracks');
                    break;
                default: setActive(undefined)
            }
        }
        window.addEventListener('popstate', () => {
            getActivePage(window.location.pathname)
        }, false)
        return () => {
            window.removeEventListener('popstate', (e) => {
                getActivePage(window.location.pathname)
            })
        }
    }, [])

    return (
        <div className="menu-container">
            <a href='https://open.spotify.com/' target='_blank' rel="noreferrer">
                <img src={SpotifyIcon} alt="Spotify Brand Logo" className='brand-logo' />
            </a>
            <div onClick={() => {
                setActive(undefined)
                history.push('/')
                document.title = 'Spotify Profile - ' + name;
            }}
                className={isActive === undefined ? 'active' : ''}
            >
                <Avatar className="avatar" srcSet={avatar}>{name ? name[0] : '...'}</Avatar>
            </div>

            <div onClick={() => {
                setActive('playlists')
                history.push('/playlists')
                document.title = 'Spotify Profile - Playlists';
            }}
                className={isActive === 'playlists' ? 'active' : ''}
            >
                <QueueMusicIcon className='nav-icon' />
                <span>Playlists</span>
            </div>

            <div onClick={() => {
                setActive('albums')
                history.push('/albums')
                document.title = 'Spotify Profile - Albums';

            }}
                className={isActive === 'albums' ? 'active' : ''}
            >
                <AlbumIcon className='nav-icon' />
                <span>Albums</span>
            </div>

            <div onClick={() => {
                setActive('top-artists')
                history.push('/top-artists')
                document.title = 'Spotify Profile - Top Artists';

            }}
                className={isActive === 'top-artists' ? 'active' : ''}
            >
                <GroupIcon className='nav-icon' />
                <span>Top Artists</span>
            </div>

            <div onClick={() => {
                setActive('top-tracks');
                history.push('/top-tracks')
                document.title = 'Spotify Profile - Top Tracks';
            }}
                className={isActive === 'top-tracks' ? 'active' : ''}
            >
                <AudiotrackIcon className='nav-icon' />
                <span>Top Tracks</span>
            </div>
            <a className='github-repo' href='https://github.com/bilalbassiri/spotify-profile' rel="noreferrer" target='_blank'>
                <GitHubIcon />
            </a>


        </div>
    )
}

export default Menu;