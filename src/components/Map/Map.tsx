import React, { useEffect } from 'react';
import { load } from '@2gis/mapgl';
import { Clusterer } from '@2gis/mapgl-clusterer';
import mapgl from '@2gis/mapgl/global';
import { MapWrapper } from './MapWrapper';
import { useAppSelector } from '../../redux/typingReduxHooks';
import { mockMarkers } from '../../constants/index';
import { userLocationTag } from '../../img';
import styles from './Map.module.css';

const Map: React.FC = () => {
    const { lngLat } = useAppSelector(state => state.coordinatesRedcer);
    const { userLocation } = useAppSelector(state => state.coordinatesRedcer);

    useEffect(() => {
        let currentCalls = Number(localStorage.getItem('apiCalls')) + 1;
        localStorage.setItem('apiCalls', currentCalls.toString());

        let map: mapgl.Map | undefined = undefined;
        let clusterer: Clusterer | undefined = undefined;

        load().then((mapgl) => {
            map = new mapgl.Map('map-container', {
                center: lngLat,
                zoom: 16,
                key: import.meta.env.VITE_2GIS_MAP_API_KEY,
            });

            if (userLocation.length) {
                new mapgl.Marker(map, {
                    coordinates: userLocation,
                    icon: userLocationTag,
                });
            }

            clusterer = new Clusterer(map, {
                radius: 60,
            });
            clusterer.load(mockMarkers);

            map.on('click', (e) => console.log(e))
        });

        // Destroy the map, if Map component is going to be unmounted
        return () => {
            map && map.destroy();
            clusterer && clusterer.destroy();
        };
    }, [lngLat]);

    return (
        <div className={styles.map}>
            <MapWrapper />
        </div>
    );
};

export default Map;