import React from 'react';
import loginUrl from '../utils/spotify';



const logoSrc = 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png';

let Login = () => {
    return (
        <div className='login-container'>
            <img src={logoSrc} alt='Spotify Brand Logo' className='login-logo'></img>
            <a href={loginUrl} className='login-btn'>LOG IN</a>
        </div>
    )
}


export default Login