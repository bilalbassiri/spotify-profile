import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { getFormatedFollowers } from '../../../utils/heplers';
import Empty from '../../Empty';
import Loading from '../../Loading';

function TopArtists({ artists }) {
    let history = useHistory();
    const [start, setStart] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setStart(true)
        }, 1000);
    }, [])
    return (
        artists && start ?
        (
            artists?.length ?
            <div className='top-artists'>
                <div>
                    <h3 className='main-title'>Top Artists</h3>
                </div>
                <div className='items-container'>
                    {
                        artists.map(artist => artist.images[0] ? (
                            (
                                <div className='artist-item' key={artist?.id}>
                                    <img className='poster' src={artist.images[1].url} alt={artist.name} onClick={() => history.push('/top-artists/' + artist.id)} />
                                    <div className='container'>
                                        <h1 className='name' onClick={() => history.push('/top-artists/' + artist.id)}>{artist.name}</h1>
                                        <span className='followers'>{getFormatedFollowers(artist.followers.total)} followers</span>
                                    </div>
                                </div>
                            )
                        ) : null)
                    }
                </div>

            </div>
            :
            <Empty title='artists' />
        ) : <Loading/>
    )
}

export default TopArtists
