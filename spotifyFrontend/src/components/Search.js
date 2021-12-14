import React, { useEffect, useState } from 'react';
import { Grid, Box, TextField } from '@mui/material';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { inputSearch, searchInSpotify } from '../store/slices/tracks';
//components
import ListSearch from './ListSearch';

const Search = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [errorInput, setErrorInput] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchInputValue(value);
        dispatch(inputSearch(value));
    }

    useEffect(() => {
        if(searchInputValue && searchInputValue.length < 15) {
            dispatch(searchInSpotify(token, searchInputValue ? searchInputValue : ''));
            setErrorInput(false);
        } else {
            setErrorInput(true);
        }
    }, [searchInputValue]);

    return (
        <Grid>
            <Box component="form">
                <TextField
                    error={errorInput && searchInputValue.length > 15 ? 'error' : ''}
                    fullWidth
                    id="search"
                    label="Buscar canciones, artistas o álbums"
                    margin="normal"
                    variant="standard"
                    onChange={(e) => handleChange(e)}
                />
            </Box>
            <ListSearch/>
        </Grid>
    );
}

export default Search;