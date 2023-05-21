import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteStateType } from '../../types';

const initialState: FavoriteStateType = {
    favId: [],
    favPlaces: {},
    isLoading: false,
    error: '',
};

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        favPlacesFetching(state) {
            state.isLoading = true;
        },
        favPlacesFetchingSuccess(state, action: PayloadAction<{ places: {}; placesId: [] }>) {
            state.isLoading = false;
            state.error = '';
            state.favPlaces = action.payload.places;
            state.favId = action.payload.placesId;
        },
        favPlacesFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        favPlacesAddNew(state, action: PayloadAction<{ places: {}; placesId: [] }>) {
            state.favPlaces = action.payload.places;
            state.favId = action.payload.placesId;
        },
        favPlacesDeleteOne(state, action: PayloadAction<{ places: {}; placesId: [] }>) {
            state.favPlaces = action.payload.places;
            state.favId = action.payload.placesId;
        },
    },
});

export default favoriteSlice.reducer;
