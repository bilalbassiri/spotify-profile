import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import {
    Loading,
    Menu,
    Profile,
    Playlists,
    Playlist,
    Albums,
    Album,
    TopArtists,
    Artist,
    TopTracks,
    TrackFeatures
} from './'

let User = ({ user, playlists, following, recently, liked, albums, artists, tracks }) => {
    const { images, display_name: name, country } = user;
    const [start, setStart] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setStart(true)
        }, 3000);
    }, [])
    return (
        <>
            <Menu avatar={images} name={name} />
            <div className="user-body">
                <Switch>
                    <Route path='/' exact>
                        {
                            name && following && start ? <Profile user={user} following={following} recently={recently} liked={liked} />
                                : <Loading />
                        }
                    </Route>
                    <Route path='/playlists' exact>
                        <Playlists playlists={playlists} />
                    </Route>
                    <Route path='/albums' exact>
                        <Albums albums={albums} />
                    </Route>
                    <Route path='/top-artists' exact>
                        <TopArtists artists={artists} />
                    </Route>
                    <Route path='/top-tracks' exact>
                        <TopTracks tracks={tracks} />
                    </Route>
                    {
                        recently.items?.map(item => (
                            <Route path={'/profile/recently-played/' + item.track.id} key={item.track.id}>
                                <TrackFeatures track={item.track} played_at={item.played_at} />
                            </Route>))
                    }
                    {
                        liked.items?.map(item => (
                            <Route path={'/profile/liked-songs/' + item.track.id} key={item.track.id}>
                                <TrackFeatures track={item.track} added_at={item.added_at} />
                            </Route>))
                    }
                    {
                        playlists?.map(playlist => (
                            <Route path={'/playlists/' + playlist.id} key={playlist.id}>
                                <Playlist id={playlist.id} />
                            </Route>
                        ))
                    }
                    {
                        albums.items?.map(item => (
                            <Route path={'/albums/' + item.album.id} key={item.album.id}>
                                {item.album ? <Album album={item} /> : <Loading isLarge />}
                            </Route>
                        ))
                    }
                    {
                        artists?.map(artist => (
                            <Route path={'/top-artists/' + artist.id} key={artist.id}>
                                <Artist artist={artist} country={country} />
                            </Route>
                        ))
                    }
                    {
                        tracks?.map(track => (
                            <Route path={'/top-tracks/' + track.id} key={track.id}>
                                <TrackFeatures track={track} />
                            </Route>))
                    }
                    {
                        following?.items?.map(f => (
                            <Route path={'/profile/following/' + f.id} key={f.id}>
                                <Artist artist={f} country={country} />
                            </Route>
                        ))
                    }
                </Switch>
            </div>
        </>
    )
}

export default User;