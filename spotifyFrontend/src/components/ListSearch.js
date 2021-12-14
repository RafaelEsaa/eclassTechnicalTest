import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { addHistorialTrack } from '../store/slices/tracks'
import Play from './Play'

const useStyles = makeStyles(theme => ({
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
}));

const ListSearch = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const tracks = useSelector(state => state.tracks?.data?.tracks?.items);
    const [playUri, setPlayUri] = useState('');
    const [listTracks, setListTracks] = useState([]);

    useEffect(() => {
        if(tracks) {
            setListTracks(tracks);
            renderListItem();
        }
    }, [tracks])

    const handleAddTrackToHistorial = (track) => {
        dispatch(addHistorialTrack(track));
    }

    const handlePlaySong = (uri, track) => {
        const trackToHistory = {
            ...track,
            date: moment(new Date()).format('DD/MM/YYYY')
        }
        setPlayUri(uri)
        handleAddTrackToHistorial(trackToHistory);
    }

    const renderListItem = () => {
        return listTracks.map((track, index) => (
            <li key={index}>
                <img className={classes.artistImage} src={track.album.images[0].url} onClick={() => handlePlaySong(track.uri, track)}/>
                <p className={classes.artistName}>{track.artists[0].name} {track.name}</p>
            </li>
        ))
    }

    return (
        tracks && tracks.length ? (
            <ul className={classes.listStyle}>
                {renderListItem()}
                <Grid className={classes.playFixed}>
                    <Play uri={playUri} />
                </Grid>
            </ul>
        ) : (
            null
        )
    )
}
 
export default ListSearch;