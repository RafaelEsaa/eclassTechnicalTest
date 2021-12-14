import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk('users', async () => {
    const response = await axios.get('https://reqres.in/api/users?per_page=12');
    return response.data.data;
});

export const userSlice = createSlice({
    name: "users",
    initialState: {
        list: [],
        nombre: 'Rafael',
        loading: false,
        error: null
    },
    extraReducers: {
        [fetchAllUsers.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [fetchAllUsers.fulfilled]: (state, action) => {
            state.list = action.payload;
            state.loading = false;

        },
        [fetchAllUsers.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    },
    reducers: {
        setName: (state, action) => {
            state.nombre = action.payload;
        }
    }
});

export const { setName } = userSlice.actions;
export default userSlice.reducer;