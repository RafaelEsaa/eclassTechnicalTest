import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { navigate } from "@reach/router"
import axios from "axios";
import moment from "moment";

export const loginSpotify = createAsyncThunk('auth', async (code) => {
    if(code || localStorage.getItem('code')) {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND}login`, { code });
        localStorage.setItem('code', code)
        return response.data;
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        codeState: null,
        token: null,
        scope: null,
        expiresIn: null,
        loading: false,
        error: null,
    },
    extraReducers: {
        // The reducer that sets the loading state from api call
        [loginSpotify.pending]: (state, action) => {
            state.loading = true;
        },
        // The reducer that sets the error state from api call
        [loginSpotify.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        // The reducer that sets the token state from api call
        [loginSpotify.fulfilled]: (state, action) => {
            console.log('fulfilled', action.payload);
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('timeLoggedIn', moment().format());
            state.scope = action.payload.scope;
            state.expiresIn = action.payload.expiresIn;
            state.loading = false;
        }
    },
    reducers: {
        setCode: (state, action) => {
            state.codeState = action.payload;
        },
        logout: (state, action) => {
            state.token = null;
            state.scope = null;
            state.expiresIn = null;
            state.loading = false;
            state.error = null;
            state.codeState = null;
            localStorage.removeItem('token');
            localStorage.removeItem('code');
            localStorage.removeItem('timeLoggedIn');
            localStorage.removeItem('persist:root');
            navigate('/');
        }
    }
});

export const { setCode, logout } = authSlice.actions;
export default authSlice.reducer;