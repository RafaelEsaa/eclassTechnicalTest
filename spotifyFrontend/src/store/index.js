import { configureStore } from "@reduxjs/toolkit";
//redux
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE } from "redux-persist"; 
import storage from "redux-persist/lib/storage";
import {combineReducers} from 'redux';
//reducers
import usersReducer from "./slices/users";
import authReducer from "./slices/auth";
import tracksReducer from "./slices/tracks";

const rootReducer = combineReducers({
    users: usersReducer,
    auth: authReducer,
    tracks: tracksReducer
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE]
            }
        }),
})

export const persistor = persistStore(store);
export default store;

// export default configureStore({
//     reducer: {
//         // reducer
//         users: usersReducer,
//         auth: authReducer
//     }
// });