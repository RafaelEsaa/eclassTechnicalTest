import React from 'react';
import { Grid, Typography, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/auth';
import { deleteListTrack } from '../store/slices/tracks'
import { Logout } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { navigate } from '@reach/router'

const useStyles = makeStyles({
    root: {
        backgroundColor: '#697fbf',
        padding: 20
    },
    titleApp: {
        '&:hover': {
            cursor: 'pointer'
        }
    }
});

const BarMenu = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(deleteListTrack());
    }

    const handleNavigateToDashboard = () => {
        navigate('/dashboard');
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={classes.root}
        >
            <Typography variant="h6" className={classes.titleApp} onClick={() => handleNavigateToDashboard()}>Spotify Web</Typography>
            <IconButton onClick={() => handleLogout()}>
                <Logout />
            </IconButton>
        </Grid>
    );
}
 
export default BarMenu;