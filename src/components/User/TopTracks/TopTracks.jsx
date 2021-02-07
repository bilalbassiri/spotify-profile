import React, { useState, useEffect } from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { getDur } from '../../../utils/heplers';
import { useHistory } from "react-router-dom";
import Empty from '../../Empty';
import Loading from '../../Loading';

function TopTracks({ tracks }) {
    let history = useHistory();
    const [start, setStart] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setStart(true)
        }, 1000);
    }, [])
    return (
        tracks && start ?
            (
                <div className='top-tracks'>
                    <div>
                        <h3 className='main-title'>Top Tracks <span>( last 4 weeks )</span></h3>
                    </div>
                    <div className='track bar'>
                        <div className='disc-num'>
                            #
                        </div>
                        <div className='track-poster'></div>
                        <div className='track-title'>
                            TITLE
                        </div>
                        <div className='album-title'>
                            ALBUM
                        </div>
                        <div className='duration'>
                            <ScheduleIcon className='schedule' />
                        </div>
                    </div>
                    {tracks?.length ? tracks.map((item, i) =>
                    (
                        <div key={i} className='track' onClick={() => history.push('/top-tracks/' + item.id)}>
                            <div className='disc-num'>
                                {i + 1}
                            </div>
                            <img src={item.album.images[0].url} alt={item.album.name} className='track-poster' />
                            <div className='track-title'>
                                <h4>{item.name}</h4>
                                <p>{item.artists?.map(i => i.name).join(', ')}</p>
                            </div>
                            <div className='album-title'>
                                {item.album.name}
                            </div>

                            <div className='duration'>
                                {Math.floor((item.duration_ms) / 60000) + ':' + getDur((item.duration_ms) % 60000)}
                            </div>
                        </div>
                    )
                    ) : <Empty title='tracks' />}
                </div>
            )
            : <Loading />
    )
}

export default TopTracks
