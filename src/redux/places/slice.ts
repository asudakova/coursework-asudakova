import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlacesStateType, InfoForMarkerType, CategoriesType, SortingType } from '../../types';

const initialState: PlacesStateType = {
    mapPlaces: {},
    listIdPlaces: [],
    markerPlaces: [],
    totalCount: 0,
    pageNumber: 1,
    category: 'food',
    sortBy: 'near',
    isLoading: false,
    error: '',
};

export const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        placesFetching(state) {
            state.isLoading = true;
        },
        placesFetchingSuccess(
            state,
            action: PayloadAction<{
                mapPlaces: {};
                listIdPlaces: [];
                markerPlaces: InfoForMarkerType[] | [];
                total: number;
            }>
        ) {
            state.isLoading = false;
            state.error = '';
            state.mapPlaces = action.payload.mapPlaces;
            state.listIdPlaces = action.payload.listIdPlaces;
            state.markerPlaces = action.payload.markerPlaces;
            state.totalCount = action.payload.total;
        },
        placesFetchingNextPage(
            state,
            action: PayloadAction<{
                mapPlaces: {};
                listIdPlaces: [];
                markerPlaces: [];
            }>
        ) {
            state.mapPlaces = Object.assign(state.mapPlaces, action.payload.mapPlaces);
            state.listIdPlaces = [...state.listIdPlaces, ...action.payload.listIdPlaces];
            state.markerPlaces = [...state.markerPlaces, ...action.payload.markerPlaces];
        },
        placesFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        placesSetCategory(state, action: PayloadAction<CategoriesType>) {
            state.category = action.payload;
        },
        placesSetSort(state, action: PayloadAction<SortingType>) {
            state.sortBy = action.payload;
        },
        placesSetPageNumber(state, action: PayloadAction<number>) {
            state.pageNumber = action.payload;
        },
    },
});

export default placesSlice.reducer;
