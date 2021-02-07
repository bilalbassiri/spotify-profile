

const authEndpoint = 'https://accounts.spotify.com/authorize',
    scopes = 'user-read-recently-played user-top-read user-follow-read user-library-read playlist-read-collaborative playlist-read-private user-read-private',
    redirectUri = 'http://localhost:3000/';

const loginUrl = `${authEndpoint}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=token&show_dialog=false`;
const getTokenFromUrl = () => {
    return window.location.hash.substring(1).split('&')[0].split('=')[1]
}
export default loginUrl;
export { getTokenFromUrl };