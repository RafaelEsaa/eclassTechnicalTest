import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Play from './Play';

const useStyles = makeStyles({
    listStyle: {
        listStyle: 'none'
    },
    artistName: {
        fontWeight: 'bold',
        fontSize: '1.2rem'
    },
    artistImage: {
        width: '100px',
        height: '100px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    playFixed: {
        position: 'fixed',
        bottom: '0',
        width: '80%',
        backgroundColor: '#fff',
        zIndex: '1'
    }
});

const HistorialTracks = () => {
    const classes = useStyles();
    const tracksHistory = useSelector(state => state.tracks.tracksHistory);
    const [playUri, setPlayUri] = useState('');

    const handlePlaySong = (uri, track) => {
        setPlayUri(uri)
    }

    const renderListItem = () => {
        return tracksHistory.map((track, index) => (
            <li key={index}>
                <img className={classes.artistImage} src={track.album.images[0].url} onClick={() => handlePlaySong(track.uri, track)}/>
                <p className={classes.artistName}>{track.artists[0].name} {track.name}</p>
                <p>Reproducida el {track.date}</p>
            </li>
        ))
    }

    return (
        <Grid>
            <Typography variant="h6">Historial</Typography>

            {tracksHistory && tracksHistory.length > 0 ? (
                <ul className={classes.listStyle}>
                    {renderListItem()}
                    <Grid className={classes.playFixed}>
                        <Play uri={playUri} />  
                    </Grid>
                </ul>
            ) : (
                <Grid item xs={12}>
                    <p>No hay canciones reproducidas</p>
                </Grid>
            )}
        </Grid>
    );
}
 
export default HistorialTracks;