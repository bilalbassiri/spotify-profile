import React, { useEffect, useState } from 'react'
import { Login, User } from './components';
import SpotifyWebApi from 'spotify-web-api-js';
import { getTokenFromUrl } from './utils/spotify';
import './styles/App.css';


const spotify = new SpotifyWebApi();

function App() {

  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [following, setFollowing] = useState({});
  const [recently, setRecently] = useState({});
  const [liked, setLiked] = useState({});
  const [albums, setAlbums] = useState({});
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const _token = getTokenFromUrl();
    if (_token) {
      window.location.hash = '';
      setToken(_token)
      spotify.setAccessToken(_token)
      spotify.getMe((err, res) => {
        setUser(res)
      });
      spotify.getUserPlaylists({ limit: 50 }).then(({ items: playlists }) => setPlaylists(playlists));
      spotify.getFollowedArtists({ limit: 12 }).then(f => setFollowing(f.artists));
      spotify.getMyRecentlyPlayedTracks({ limit: 30 }).then(res => setRecently(res));
      spotify.getMySavedTracks({ limit: 30 }).then(res => setLiked(res));
      spotify.getMySavedAlbums({ limit: 50 }).then(res => setAlbums(res));
      spotify.getMyTopArtists({ limit: 50 }).then(({ items }) => {
        setArtists(items)
      })
      spotify.getMyTopTracks({ time_range: 'short_term', limit: 50 }).then(({ items }) => {
        setTracks(items)
      })
    }
  }, [])


  return (
    <div className="App">
      {
        token ?
          <User 
              user={user}
              playlists={playlists}
              following={following}
              recently={recently}
              liked={liked}
              albums={albums}
              artists={artists}
              tracks={tracks}
          />
          :
          <Login />
      }
    </div>
  );
}

export default App;