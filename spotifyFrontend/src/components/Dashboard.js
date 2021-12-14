import React from 'react';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from '@reach/router';
//components
import Search from './Search';

const useStyles = makeStyles({
    root: {
        padding: 20
    }
});

const Dashboard = () => {
    const classes = useStyles();

    return (
        <Grid>
            <Grid container className={classes.root}>
                <Grid item xs={6}>
                    <Typography variant="h4">¡Hola! Bienvenido</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Link to="/historial-tracks">
                        <Typography variant="h4">
                            Historial de tracks
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
            <Search/>
        </Grid>
    );
}

export default Dashboard;