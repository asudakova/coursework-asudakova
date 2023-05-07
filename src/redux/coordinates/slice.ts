import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface CoordinatesState {
    lngLat: number[],
    userLocation: number[],
    isLoading: boolean,
    error: string
}

const initialState: CoordinatesState = {
    lngLat: [37.6174943, 55.7504461],
    userLocation: [],
    isLoading: false,
    error: ''
}

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
    }
})

export default coordinatesSlice.reducer;