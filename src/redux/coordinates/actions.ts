import { AppDispatch } from '../store';
import { coordinatesSlice } from './slice';
import axios from 'axios';

export const fetchCoordinates = (city: string) => (dispatch: AppDispatch) => {
    dispatch(coordinatesSlice.actions.coordinatesFetching());
    try {
        axios
            .get(
                `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${
                    import.meta.env.VITE_WEATHERAPI_GEOCODER_API_KEY
                }`
            )
            .then((res) => {
                if (res.data[0]?.country === 'RU') {
                    const lon = res.data[0].lon;
                    const lat = res.data[0].lat;
                    dispatch(
                        coordinatesSlice.actions.coordinatesFetchingFromSearchSuccess(
                            [lon, lat]
                        )
                    );
                }
            });
    } catch (e) {
        if (e instanceof Error) {
            dispatch(
                coordinatesSlice.actions.coordinatesFetchingError(e.message)
            );
        }
    }
};

export const getUserLocation = () => (dispatch: AppDispatch) => {
    try {
        dispatch(coordinatesSlice.actions.coordinatesFetching());
        navigator.geolocation.getCurrentPosition((position) => {
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;

            dispatch(
                coordinatesSlice.actions.coordinatesFetchingFromLocationSuccess(
                    [lon, lat]
                )
            );
        });
    } catch (e) {
        if (e instanceof Error) {
            dispatch(
                coordinatesSlice.actions.coordinatesFetchingError(e.message)
            );
        }
    }
};

export const setMapBoundaries =
    (bounds: number[]) => (dispatch: AppDispatch) => {
        dispatch(coordinatesSlice.actions.coordinatesSetMapBoundaries(bounds));
    };
