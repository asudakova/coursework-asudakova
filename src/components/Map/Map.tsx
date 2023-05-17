import React, { useEffect } from 'react';
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
import { clustererTag, clustererTagHover } from '../../img';

const Map: React.FC = () => {
    const { setMapglContext } = useMapglContext();

    const dispatch = useAppDispatch();
    const { lngLat } = useAppSelector((state) => state.coordinatesReducer);
    const { userLocation } = useAppSelector(
        (state) => state.coordinatesReducer
    );
    const foundPlaces = useAppSelector(
        (state) => state.placesReducer.markerPlaces
    );

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
                    hoverIcon: clustererTagHover,
                    labelColor: '#ffffff',
                    labelFontSize: 18,
                },
            });
            clusterer.load(
                createMapMarkersArray(foundPlaces as [[number, number]])
            );

            map.on('click', (e) => console.log(e));

            const { northEast, southWest } = map.getBounds();
            const bounds = [...northEast, ...southWest];
            dispatch(setMapBoundaries(bounds));

            setMapglContext({ clusterer });
        });

        // Destroy the map, if Map component is going to be unmounted
        return () => {
            map && map.destroy();
            clusterer && clusterer.destroy();
            userLocationMarker && userLocationMarker.destroy();
            setMapglContext({ clusterer: undefined });
        };
    }, [lngLat]);

    const { clusterer } = useMapglContext();

    useEffect(() => {
        if (clusterer !== undefined) {
            clusterer.load(
                createMapMarkersArray(foundPlaces as [[number, number]])
            );
        }
    }, [foundPlaces]);

    return (
        <div className={styles.map}>
            <MapWrapper />
        </div>
    );
};

export default Map;
