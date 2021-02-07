import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Empty from '../../Empty';
import Loading from '../../Loading';

let Albums = ({ albums: { items } }) => {
    let history = useHistory();
    const [start, setStart] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setStart(true)
        }, 1000);
    }, [])
    return (
        items && start ?
            (
                items.length ?
                    <div className='albums'>
                        <h3 className='main-title'>Albums</h3>
                        <div className='items-container'>
                            {
                                items?.length ? items?.map(({ album }) => (
                                    <div className='album-item' key={album.id} onClick={() => history.push('/albums/' + album.id)}>
                                        <img className='poster' src={album.images[0]?.url} alt={album.name} />
                                        <div className='container'>
                                            <h2 className='name'>
                                                {album?.name}
                                            </h2>
                                            <p className='artists'>
                                                {album?.artists?.map(a => a.name).join(', ')}
                                                <span> {album?.release_date.slice(0, 4)}</span>
                                                <span> {album?.total_tracks} {album?.total_tracks > 1 ? 'songs' : 'song'}</span>
                                            </p>
                                        </div>
                                    </div>
                                )) : null
                            }
                        </div>

                    </div>
                    :
                    <Empty title={'albums'} />
            )
            : <Loading />
    )
}
export default Albums
