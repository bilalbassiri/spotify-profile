import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Tracks from './Tracks';
import { useHistory } from "react-router-dom";
import { getFoll } from '../../../utils/heplers'
import Empty from '../../Empty';

let Profile = ({ user: { display_name: name, images, followers, external_urls }, following, recently, liked }) => {
    document.title = 'Spotify Profile - ' + name;
    let history = useHistory();
    const { items, total } = following;

    return (
        <div className="profile">
            <div className='top-profile'>
                <a href='https://accounts.spotify.com/en/logout?'>
                    <button type='button' className='logout-btn'>LOG OUT</button>
                </a>
                <Avatar src={(images && images.length) ? images[0].url : null} alt={name} className='profile-avatar' >{name ? name[0] : '...'}</Avatar>
                <div>
                    <a href={external_urls?.spotify} rel="noreferrer" target='_blank' className='pro-name'><h1>{name}</h1></a>
                    <p className='foll'><span>{getFoll(followers?.total)}</span> followers<span></span><span>{getFoll(following?.total)}</span> following</p>
                </div>
            </div>
            <h3 key='1' className='main-title'>Following</h3>
            <div className="following">
                {items?.length ? items?.map(a => (
                    <div key={a.id} className='art-card' onClick={() => history.push('/profile/following/' + a.id)}>
                        <img src={a.images[0]?.url} className='fol-artist-avatar' alt={a.name} />
                        <div className='fol-artist-details'>
                            <h1>{a.name}</h1>
                            <span>{getFoll(a.followers.total)} followers</span>
                        </div>
                    </div>)) : <Empty title='following' />}
            </div>
            <div className='more-following'>
                {
                    total && total > 12 && items.length ?
                        <>You are following those and <a className='more-link' href='https://open.spotify.com/collection/artists' rel="noreferrer" target='_blank'>{total - 12} more</a></>
                        :
                        null
                }
            </div>
            <h3 key='2' className='main-title'>Recently Played</h3>
            <Tracks tracks={recently} comp='played'/>
            <h3 key='3' className='main-title'>Liked Songs</h3>
            <Tracks tracks={liked} comp='liked'/>
        </div>
    )
}

export default Profile