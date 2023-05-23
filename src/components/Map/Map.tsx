import React, { useEffect, useState, useCallback } from 'react';
import { load } from '@2gis/mapgl';
import { Clusterer } from '@2gis/mapgl-clusterer';
import mapgl from '@2gis/mapgl/global';
import { MapWrapper } from './MapWrapper';
import { useAppSelector, useAppDispatch } from '../../redux/typingReduxHooks';
import { setMapBoundaries } from '../../redux/coordinates/actions';
import { userLocationTag } from '../../img';
import { createMapMarkersArray } from '../../helpers/createMapMarkersArray';
import styles from './Map.module.css';
import { useMapglContext } from './MapglContext';
import { clustererTag } from '../../img';
import { setMarkerTip, unsetMarkerTip } from '../../redux/marker/actions';
import { MarkerType } from '../../types';
import MarkerTip from '../MarkerTip/MarkerTip';
import { useNavigate } from 'react-router-dom';
//@ts-ignore
import debounce from 'lodash.debounce';

const Map: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { setMapglContext } = useMapglContext();

    const { lngLat } = useAppSelector((state) => state.coordinatesReducer);
    const { userLocation } = useAppSelector((state) => state.coordinatesReducer);
    const foundPlaces = useAppSelector((state) => state.placesReducer.markerPlaces);

    const [currentBounds, setCurrentBounds] = useState<number[] | []>([]);
    const [debouncedBounds, setDebouncedBounds] = useState<number[] | []>([]);

    useEffect(() => {
        if (currentBounds.length) {
            debouceMapBounds(currentBounds);
        }
    }, [currentBounds]);

    const debouceMapBounds = useCallback(
        debounce((bounds: number[]) => {
            setDebouncedBounds(bounds);
        }, 1000),
        []
    );

    useEffect(() => {
        if (debouncedBounds.length) {
            dispatch(setMapBoundaries(debouncedBounds));
        }
    }, [debouncedBounds]);

    useEffect(() => {
        let map: mapgl.Map | undefined = undefined;
        let clusterer: Clusterer | undefined = undefined;
        let userLocationMarker: mapgl.Marker | undefined = undefined;

        load().then((mapgl) => {
            map = new mapgl.Map('map-container', {
                center: lngLat,
                zoom: 16,
                key: import.meta.env.VITE_2GIS_MAP_API_KEY,
            });

            if (userLocation.length) {
                userLocationMarker = new mapgl.Marker(map, {
                    coordinates: userLocation,
                    icon: userLocationTag,
                });
            }

            clusterer = new Clusterer(map, {
                radius: 60,
                clusterStyle: {
                    icon: clustererTag,
                    size: [30, 30],
                    labelColor: '#ffffff',
                    labelFontSize: 18,
                },
            });
            clusterer.load(createMapMarkersArray(foundPlaces, 'main'));

            clusterer.on('click', (event) => {
                const { userData } = event.target.data as MarkerType;
                const arrUserData = userData?.split(',');
                if (arrUserData) {
                    const meta = arrUserData[0];
                    const id = arrUserData[1];
                    if (event.target.type === 'marker' && meta === 'main') {
                        dispatch(unsetMarkerTip());
                        navigate(`/main/place/${id}`);
                    }
                    if (event.target.type === 'marker' && meta === 'fav') {
                        dispatch(unsetMarkerTip());
                        navigate(`/main/favorite/place/${id}`);
                    }
                }
            });

            clusterer.on('mouseover', (event) => {
                const { userData } = event.target.data as MarkerType;
                const arrUserData = userData?.split(',');
                if (arrUserData) {
                    const meta = arrUserData[0];
                    const id = arrUserData[1];
                    const { point } = event;
                    if (userData && meta !== 'one') {
                        dispatch(setMarkerTip(meta, id, point));
                    }
                }
            });

            clusterer.on('mouseout', () => {
                dispatch(unsetMarkerTip());
            });

            const { northEast, southWest } = map.getBounds();
            const bounds = [...northEast, ...southWest];
            dispatch(setMapBoundaries(bounds));

            setMapglContext({ clusterer, mapglInstance: map, mapgl });

            map.on('idle', () => {
                if (map !== undefined && map.isIdle()) {
                    const { northEast, southWest } = map.getBounds();
                    setCurrentBounds([...northEast, ...southWest]);
                }
            });
        });

        return () => {
            map && map.destroy();
            clusterer && clusterer.destroy();
            userLocationMarker && userLocationMarker.destroy();
            setMapglContext({ clusterer: undefined, mapglInstance: undefined, mapgl: undefined });
        };
    }, [lngLat]);

    const { clusterer } = useMapglContext();

    useEffect(() => {
        if (clusterer !== undefined) {
            clusterer.load(createMapMarkersArray(foundPlaces, 'main'));
        }
    }, [foundPlaces]);

    return (
        <>
            <div className={styles.map}>
                <MapWrapper />
                <MarkerTip />
            </div>
        </>
    );
};

export default Map;
