import React from 'react';
import loginUrl from '../utils/spotify';
import SpotifyLogo from '../img/Spotify_Logo_RGB_White.png';


let Login = () => {
    return (
        <div className='login-container'>
            <img src={SpotifyLogo} alt='Spotify Brand Logo' className='login-logo'></img>
            <a href={loginUrl} className='login-btn'>LOG IN</a>
        </div>
    )
}


export default Login