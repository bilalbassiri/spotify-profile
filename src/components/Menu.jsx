import React, { useState, useEffect } from 'react';
import AlbumIcon from '@material-ui/icons/Album';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import GroupIcon from '@material-ui/icons/Group';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import Avatar from '@material-ui/core/Avatar';
import bodyLogo from '../img/Spotify_icon.png';
import { useHistory } from "react-router-dom";


let Menu = ({ avatar, name }) => {
    avatar = (avatar && avatar.length) ? avatar[0].url : null;
    let history = useHistory();
    const [isActive, setActive] = useState(undefined);
    useEffect(() => {
        let getActivePage = (_path) => {
            _path = _path.split('/')[1];
            switch (_path) {
                case undefined || 'profile':
                    setActive(undefined);
                    break;
                case 'playlists':
                    setActive('p');
                    break;
                case 'top-artists':
                    setActive('ta');
                    break;
                case 'top-tracks':
                    setActive('tt');
                    break;
                default: setActive(_path[0])
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
                <img src={bodyLogo} alt="Spotify Brand Logo" className='brand-logo' />
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
                setActive('p')
                history.push('/playlists')
                document.title = 'Spotify Profile - Playlists';
            }}
                className={isActive === 'p' ? 'active' : ''}
            >
                <QueueMusicIcon className='nav-icon' />
                <span>Playlists</span>
            </div>

            <div onClick={() => {
                setActive('a')
                history.push('/albums')
                document.title = 'Spotify Profile - Albums';

            }}
                className={isActive === 'a' ? 'active' : ''}
            >
                <AlbumIcon className='nav-icon' />
                <span>Albums</span>
            </div>

            <div onClick={() => {
                setActive('ta')
                history.push('/top-artists')
                document.title = 'Spotify Profile - Top Artists';

            }}
                className={isActive === 'ta' ? 'active' : ''}
            >
                <GroupIcon className='nav-icon' />
                <span>Top Artists</span>
            </div>

            <div onClick={() => {
                setActive('tt');
                history.push('/top-tracks')
                document.title = 'Spotify Profile - Top Tracks';
            }}
                className={isActive === 'tt' ? 'active' : ''}
            >
                <AudiotrackIcon className='nav-icon' />
                <span>Top Tracks</span>
            </div>


        </div>
    )
}

export default Menu;