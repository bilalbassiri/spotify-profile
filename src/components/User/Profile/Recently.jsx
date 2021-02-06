import React, { useState } from 'react';
import HistoryIcon from '@material-ui/icons/History';
import ScheduleIcon from '@material-ui/icons/Schedule';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import getPassedTime, { getDur, getDisplay } from '../../../utils/heplers';
import { useHistory } from "react-router-dom";
import NotFound from '../../Empty';

let Recently = ({ recently: { items } }) => {
    let history = useHistory();
    const [flex, setFlex] = useState('none');
    return (
        <div className='recently-played'>
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
                <div className='date'>
                    PLAYED
                </div>
                <div className='duration'>
                    <ScheduleIcon className='schedule' />
                </div>
            </div>
            {items?.length ? items.map((item, i) =>
            (
                <div key={i} className='track' style={getDisplay(i, flex)} onClick={() => history.push('/profile/recently-played/' + item.track.id)}>
                    <div className='disc-num'>
                        {i + 1}
                    </div>
                    <img src={item.track.album.images[0].url} alt={item.track.album.name} className='track-poster' />
                    <div className='track-title'>
                        <h4>{item.track.name}</h4>
                        <p>{item.track.artists?.map(i => i.name).join(', ')}</p>
                    </div>
                    <div className='album-title'>
                        {item.track.album.name}
                    </div>
                    <div className='date'>
                        <HistoryIcon style={{ color: '#1DB954', marginRight: '5px', fontSize: '1rem' }} />
                        {getPassedTime(item.played_at)}
                    </div>
                    <div className='duration'>
                        {Math.floor((item.track.duration_ms) / 60000) + ':' + getDur((item.track.duration_ms) % 60000)}
                    </div>
                </div>
            )
            ) : <NotFound title='recently' />}
            {
                flex === 'none' ? <div className='shadow' onClick={(e) => {
                    setFlex(flex === 'none' ? 'flex' : 'none')
                }} style={(items?.length) <= 5 ? { display: 'none' } : { display: 'block' }}></div> : null
            }
            <div className='show' style={(items?.length) <= 5 ? { display: 'none' } : { display: 'grid' }} onClick={(e) => {
                setFlex(flex === 'none' ? 'flex' : 'none')
            }}>
                {flex === 'none' ? <UnfoldMoreIcon className='unfold' /> : <UnfoldLessIcon className='unfold' />}
            </div>
        </div>
    )
}

export default Recently;
