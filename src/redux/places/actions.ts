import { AppDispatch } from '../store';
import { placesSlice } from './slice';
//import { mockPlaces, mockPlacesNext } from '../../constants/requestMock';
import axios from 'axios';
import {
    FetchArgumentsType,
    CategoriesType,
    SortingType,
    FetchNextPageArgumentsType,
    OptionsType,
} from '../../types';
import { createEntityMap } from '../../helpers/createEntityMap';
import { categoryQueryParams, sortQueryParams } from '../../constants';

const cache = new Map();

export const fetchPlaces =
    ({ north, east, south, west, category, sortBy }: FetchArgumentsType) =>
    async (dispatch: AppDispatch) => {
        dispatch(placesSlice.actions.placesFetching());

        const URL = 'https://catalog.api.2gis.com/3.0/items';
        const options: OptionsType = {
            params: {
                q: `${categoryQueryParams[category]}`,
                locale: 'ru_RU',
                has_rating: 'true',
                fields: 'items.reviews,items.schedule,items.name_ex,items.external_content,items.point',
                point1: `${south},${east}`,
                point2: `${north},${west}`,
                sort: `${sortQueryParams[sortBy]}`,
                page_size: `${10}`,
                page: `1`,
                key: `${import.meta.env.VITE_2GIS_PLACES_API_KEY}`,
            },
        };

        const paramsString = new URLSearchParams(options.params).toString();
        const fetchString = URL + paramsString;

        if (cache.get(fetchString)) {
            const { mapPlaces, listIdPlaces, markerPlaces, total } =
                cache.get(fetchString);

            dispatch(
                placesSlice.actions.placesFetchingSuccess({
                    mapPlaces,
                    listIdPlaces,
                    markerPlaces,
                    total,
                })
            );
        } else {
            try {
                // mockPlaces().then((data: any) => {
                //     //console.log(createEntityMap(data.result.items), data.result.total)
                //     const { mapPlaces, listIdPlaces, markerPlaces } =
                //         createEntityMap(data.result.items);
                //     const total = data.result.total;
                //     dispatch(
                //         placesSlice.actions.placesFetchingSuccess({
                //             mapPlaces,
                //             listIdPlaces,
                //             markerPlaces,
                //             total,
                //         })
                //     );
                // });

                const currentCalls =
                    Number(localStorage.getItem('apiCallsToPlaces')) + 1;
                localStorage.setItem(
                    'apiCallsToPlaces',
                    currentCalls.toString()
                );

                const response = await axios.get(URL, options);

                if (
                    response.data.meta.code == 404 &&
                    response.data.meta.error?.message == 'Results not found'
                ) {
                    const mapPlaces = {};
                    const listIdPlaces: [] = [];
                    const markerPlaces: [] = [];
                    const total = 0;

                    cache.set(fetchString, {
                        mapPlaces,
                        listIdPlaces,
                        markerPlaces,
                        total,
                    });

                    dispatch(
                        placesSlice.actions.placesFetchingSuccess({
                            mapPlaces,
                            listIdPlaces,
                            markerPlaces,
                            total,
                        })
                    );
                } else if (response.data.meta.code == 200) {
                    const { mapPlaces, listIdPlaces, markerPlaces } =
                        createEntityMap(response.data.result.items);
                    const total = response.data.result.total;

                    cache.set(fetchString, {
                        mapPlaces,
                        listIdPlaces,
                        markerPlaces,
                        total,
                    });

                    dispatch(
                        placesSlice.actions.placesFetchingSuccess({
                            mapPlaces,
                            listIdPlaces,
                            markerPlaces,
                            total,
                        })
                    );
                }
            } catch (e) {
                if (e instanceof Error) {
                    dispatch(
                        placesSlice.actions.placesFetchingError(e.message)
                    );
                }
            }
        }
    };

export const fetchNextPage =
    ({
        north,
        east,
        south,
        west,
        category,
        sortBy,
        pageNumber,
    }: FetchNextPageArgumentsType) =>
    async (dispatch: AppDispatch) => {
        const URL = 'https://catalog.api.2gis.com/3.0/items';
        const options = {
            params: {
                q: categoryQueryParams[category],
                locale: 'ru_RU',
                has_rating: 'true',
                fields: 'items.reviews,items.schedule,items.name_ex,items.external_content,items.point',
                point1: `${south},${east}`,
                point2: `${north},${west}`,
                sort: `${sortQueryParams[sortBy]}`,
                page_size: `${10}`,
                page: `${pageNumber}`,
                key: `${import.meta.env.VITE_2GIS_PLACES_API_KEY}`,
            },
        };

        const paramsString = new URLSearchParams(options.params).toString();
        const fetchString = URL + paramsString;

        if (cache.get(fetchString)) {
            const { mapPlaces, listIdPlaces, markerPlaces } =
                cache.get(fetchString);

            dispatch(
                placesSlice.actions.placesFetchingNextPage({
                    mapPlaces,
                    listIdPlaces,
                    markerPlaces,
                })
            );
        } else {
            try {
                // mockPlacesNext().then((data: any) => {
                //     //console.log(createEntityMap(data.result.items), data.result.total)
                //     const { mapPlaces, listIdPlaces, markerPlaces } =
                //         createEntityMap(data.result.items);
                //     dispatch(
                //         placesSlice.actions.placesFetchingNextPage({
                //             mapPlaces,
                //             listIdPlaces,
                //             markerPlaces,
                //         })
                //     );
                // });

                const currentCalls =
                    Number(localStorage.getItem('apiCallsToPlaces')) + 1;
                localStorage.setItem(
                    'apiCallsToPlaces',
                    currentCalls.toString()
                );

                const response = await axios.get(URL, options);

                if (
                    response.data.meta.code == 404 &&
                    response.data.meta.error?.message == 'Results not found'
                ) {
                    const mapPlaces = {};
                    const listIdPlaces: [] = [];
                    const markerPlaces: [] = [];

                    cache.set(fetchString, {
                        mapPlaces,
                        listIdPlaces,
                        markerPlaces,
                    });

                    dispatch(
                        placesSlice.actions.placesFetchingNextPage({
                            mapPlaces,
                            listIdPlaces,
                            markerPlaces,
                        })
                    );
                } else if (response.data.meta.code == 200) {
                    const { mapPlaces, listIdPlaces, markerPlaces } =
                        createEntityMap(response.data.result.items);

                    cache.set(fetchString, {
                        mapPlaces,
                        listIdPlaces,
                        markerPlaces,
                    });

                    dispatch(
                        placesSlice.actions.placesFetchingNextPage({
                            mapPlaces,
                            listIdPlaces,
                            markerPlaces,
                        })
                    );
                }
            } catch (e) {
                if (e instanceof Error) {
                    dispatch(
                        placesSlice.actions.placesFetchingError(e.message)
                    );
                }
            }
        }
    };

export const setNewCategory =
    (shortCut: CategoriesType) => (dispatch: AppDispatch) => {
        dispatch(placesSlice.actions.placesSetCategory(shortCut));
    };

export const setNewSort =
    (shortCut: SortingType) => (dispatch: AppDispatch) => {
        dispatch(placesSlice.actions.placesSetSort(shortCut));
    };

export const setNewPageNumber =
    (newPage: number) => (dispatch: AppDispatch) => {
        dispatch(placesSlice.actions.placesSetPageNumber(newPage));
    };
