import React from 'react';
import { Button } from "@mui/material"

const Login = () => {
    const urlLoginSpotify = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-top-read%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-read-recently-played%20user-follow-read%20user-follow-modify`;
    return (
        <>
            <Button 
                variant="contained" 
                color="primary"
                href={urlLoginSpotify}
            >
                Login Spotify
            </Button>
        </>
    );
}
 
export default Login;