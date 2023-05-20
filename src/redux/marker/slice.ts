import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarkerTipStateType } from '../../types';

const initialState: MarkerTipStateType = {
    isHover: false,
    id: '',
    coordinates: [0, 0],
};

export const markerSlice = createSlice({
    name: 'marker',
    initialState,
    reducers: {
        markerShowTip(state, action: PayloadAction<{ id: string; coordinates: number[] }>) {
            state.isHover = true;
            state.id = action.payload.id;
            state.coordinates = action.payload.coordinates;
        },
        markerHideTip(state) {
            state.isHover = false;
            state.id = '';
            state.coordinates = [0, 0];
        },
    },
});

export default markerSlice.reducer;
