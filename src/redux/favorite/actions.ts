import { AppDispatch } from '../store';
import { coordinatesSlice } from './slice';
import axios from 'axios';

export const fetchCoordinates = (city: string) => (dispatch: AppDispatch) => {
    dispatch(coordinatesSlice.actions.coordinatesFetching());
    try {
        axios
            .get(
                `https://catalog.api.2gis.com/3.0/items/geocode?q=${city}&fields=items.point&key=${
                    import.meta.env.VITE_2GIS_PLACES_API_KEY
                }`
            )
            .then((res) => {
                if (res.data?.meta?.code == 200) {
                    const lon = res.data?.result?.items[0]?.point?.lon;
                    const lat = res.data?.result?.items[0]?.point?.lat;
                    dispatch(coordinatesSlice.actions.coordinatesFetchingFromSearchSuccess([lon, lat]));
                }
            });
    } catch (e) {
        if (e instanceof Error) {
            dispatch(coordinatesSlice.actions.coordinatesFetchingError(e.message));
        }
    }
};

export const getUserLocation = () => (dispatch: AppDispatch) => {
    try {
        dispatch(coordinatesSlice.actions.coordinatesFetching());
        navigator.geolocation.getCurrentPosition((position) => {
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;

            dispatch(coordinatesSlice.actions.coordinatesFetchingFromLocationSuccess([lon, lat]));
        });
    } catch (e) {
        if (e instanceof Error) {
            dispatch(coordinatesSlice.actions.coordinatesFetchingError(e.message));
        }
    }
};

export const setMapBoundaries = (bounds: number[]) => (dispatch: AppDispatch) => {
    dispatch(coordinatesSlice.actions.coordinatesSetMapBoundaries(bounds));
};
