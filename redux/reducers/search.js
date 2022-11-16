import { createSlice } from '@reduxjs/toolkit';

export const searctListSlice = createSlice({
    name: 'searchList',
    initialState: {},
    reducers: {
        selectItem: (state, { payload }) => {
            const { itemSearch } = payload;
            state(itemSearch);
        },
    }
});

export const { actions } = searctListSlice;

export default searctListSlice.reducer;
