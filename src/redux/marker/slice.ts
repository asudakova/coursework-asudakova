import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarkerTipStateType } from '../../types';

const initialState: MarkerTipStateType = {
    isHover: false,
    id: '',
    coordinates: [0, 0],
    meta: '',
};

export const markerSlice = createSlice({
    name: 'marker',
    initialState,
    reducers: {
        markerShowTip(state, action: PayloadAction<{ id: string; coordinates: number[], meta: string }>) {
            state.isHover = true;
            state.id = action.payload.id;
            state.coordinates = action.payload.coordinates;
            state.meta = action.payload.meta;
        },
        markerHideTip(state) {
            state.isHover = false;
            state.id = '';
            state.coordinates = [0, 0];
            state.meta = '';
        },
    },
});

export default markerSlice.reducer;
