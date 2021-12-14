import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const searchInSpotify = createAsyncThunk('tracks', async (token, { dispatch, getState }) => {
    const data = getState().tracks.searchInput;
    const Headers = {
        headers: {
            Authorization: `${token}`,
        },
    };
    const response = await axios.post(`${process.env.REACT_APP_BACKEND}search`, { data }, Headers);
    return response.data;
});

export const tracksSlice = createSlice({
    name: "tracks",
    initialState: {
        data: [],
        tracksHistory: [],
        searchInput: '',
        loading: false,
        error: null,
    },
    extraReducers: {
        // The reducer that sets the loading state from api call
        [searchInSpotify.pending]: (state, action) => {
            state.loading = true;
        },
        // The reducer that sets the error state from api call
        [searchInSpotify.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        // The reducer that sets the token state from api call
        [searchInSpotify.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.searchInput = '';
            state.loading = false;
        }
    },
    reducers: {
        addHistorialTrack: (state, action) => {
            state.tracksHistory.push(action.payload);
        },
        inputSearch: (state, action) => {
            state.searchInput = action.payload;
        },
        deleteListTrack: (state, action) => {
            state.data = [];
        },
    }
});

export const { 
    inputSearch, 
    deleteListTrack,
    addHistorialTrack
} = tracksSlice.actions;
export default tracksSlice.reducer;