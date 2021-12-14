import React, { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useSelector } from 'react-redux';

const Play = ({ uri }) => {
    const token = useSelector(state => state.auth.token);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => setIsPlaying(!isPlaying), [uri]);

    return (
        <SpotifyPlayer
            uris={ uri ? [uri] : [] }
            token={token}
            callback={(state) => {
                if(!state.isPlaying) {
                    setIsPlaying(false);
                }
            }}
            play={isPlaying}
        />
    );
}
 
export default Play;