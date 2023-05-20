import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoordinatesStateType } from '../../types';

//по дефолту центр москвы
const initialState: CoordinatesStateType = {
    lngLat: [37.6174943, 55.7504461],
    userLocation: [],
    boundaries: {
        north: 37.62207552322174,
        east: 55.755620482396914,
        south: 37.6129130767777,
        west: 55.745271054282036,
    },
    isLoading: false,
    error: '',
};

export const coordinatesSlice = createSlice({
    name: 'coordinates',
    initialState,
    reducers: {
        coordinatesFetching(state) {
            state.isLoading = true;
        },
        coordinatesFetchingFromSearchSuccess(state, action: PayloadAction<number[]>) {
            state.isLoading = false;
            state.error = '';
            state.lngLat = action.payload;
        },
        coordinatesFetchingFromLocationSuccess(state, action: PayloadAction<number[]>) {
            state.isLoading = false;
            state.error = '';
            state.lngLat = action.payload;
            state.userLocation = action.payload;
        },
        coordinatesFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        coordinatesSetMapBoundaries(state, action: PayloadAction<number[]>) {
            state.boundaries.north = action.payload[0];
            state.boundaries.east = action.payload[1];
            state.boundaries.south = action.payload[2];
            state.boundaries.west = action.payload[3];
        },
    },
});

export default coordinatesSlice.reducer;
