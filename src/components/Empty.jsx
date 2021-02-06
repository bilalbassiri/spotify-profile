import React from 'react'
import MusicNoteOutlinedIcon from '@material-ui/icons/MusicNoteOutlined';
import QueueMusicOutlinedIcon from '@material-ui/icons/QueueMusicOutlined';
import AlbumOutlinedIcon from '@material-ui/icons/AlbumOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

function Empty({ title }) {
    return (
        <div className='not-found'>
            <div className='item'>
                {
                    title === 'liked' ? 
                            <>
                                <MusicNoteOutlinedIcon className='icon' />
                                <br />
                                Songs you like will appear here
                            </>
                    
                    :title === 'playlists' ? 
                            <>
                                <QueueMusicOutlinedIcon className='icon' />
                                <br />
                                Playlists you save will appear here
                            </>
                    :title === 'albums' ? 
                            <>
                                <AlbumOutlinedIcon className='icon' />
                                <br />
                                Albums you save will appear here
                            </>
                    :title === 'recently' ? 
                            <>
                                <MusicNoteOutlinedIcon className='icon'/><br/>
                                Tracks you play will appear here
                            </>
                    :title === 'artists'  ? 
                            <>
                                <PeopleOutlineIcon className='icon'/><br/>
                                There's no artists to show here
                            </>
                    :title === 'tracks' ? 
                            <>
                                <MusicNoteOutlinedIcon className='icon'/><br/>
                                There's no tracks to show here
                            </>
                    :title === 'following' ?
                             <>
                                <PeopleOutlineIcon className='icon'/><br/>
                                Artists you follow will appear here
                             </>
                    :null
                }
            </div>

        </div>
    )
}

export default Empty
