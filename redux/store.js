import { combineReducers, configureStore } from '@reduxjs/toolkit';
import search from './reducers/search';

const rootReducer = combineReducers({
    search
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        thunk: true
    }),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
