import React, { useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ScheduleIcon from '@material-ui/icons/Schedule';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import getPassedTime, { getDur, getDisplay } from '../../../utils/heplers';
import NotFound from '../../Empty';
import { useHistory } from "react-router-dom";

let Liked = ({ liked: { items } }) => {
    let history = useHistory();
    const [flex, setFlex] = useState('none');
    return (
        <div className='liked'>
            <div className='track bar' style={{ display: items?.length ? 'flex' : 'none' }}>
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
                    LIKED
                </div>
                <div className='duration'>
                    <ScheduleIcon className='schedule' />
                </div>
            </div>
            {items?.length ? items.map((item, i) =>
            (
                <div key={i} className='track' style={getDisplay(i, flex)} onClick={() => history.push('/profile/liked-songs/' + item.track.id)}>
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
                        <FavoriteIcon
                            style={{ color: '#1DB954', marginRight: '5px', fontSize: '1rem' }} />
                        {getPassedTime(item.added_at)}
                    </div>

                    <div className='duration'>
                        {Math.floor((item.track.duration_ms) / 60000) + ':' + getDur((item.track.duration_ms) % 60000)}
                    </div>
                </div>
            )
            ) : <NotFound title={'liked'} />}
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

export default Liked;
