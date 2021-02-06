import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Empty from '../../Empty';
import Loading from '../../Loading';

let Playlists = ({ playlists }) => {
    let history = useHistory();
    const [start, setStart] = useState(false);
    useEffect(() => {
        setInterval(() => {
            setStart(true)
        }, 1000);
    }, [])
    return (
        playlists && start ?
            (
                playlists?.length ?
                    <div className='playlists'>
                        <h3 className='main-title'>Playlists</h3>
                        <div className='items-container'>
                            {
                                playlists.map(p => (
                                    <div className='playlist-item' key={p.id} onClick={() => history.push('/playlists/' + p.id)}>
                                        {p.images[0] ? <img className='poster' src={p.images[0]?.url} alt={p.name} /> : null}
                                        <div className='container'>
                                            <h2 className='name'>
                                                {p?.name}
                                            </h2>

                                            <p className='owner'>
                                                By {p?.owner?.display_name}
                                            </p>
                                            <p className='tracks'>
                                                {p.tracks?.total} songs
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    : <Empty title={'playlists'} />
            )
            : <Loading />
    )
}
export default Playlists;
