import React, { useEffect } from 'react';
import { load } from '@2gis/mapgl';
import { Clusterer } from '@2gis/mapgl-clusterer';
import mapgl from '@2gis/mapgl/global';
import styles from './Map.module.css';
import { MapWrapper } from './MapWrapper'
import mapMarkerSvg from '../../img/map-marker.svg'


const Map: React.FC = () => {
    const MAP_CENTER = [37.62264509986394, 55.75428544939373];
    const API_KEY = 'paste your api key here';

    useEffect(() => {
        let currentCalls = Number(localStorage.getItem('apiCalls')) + 1;
        localStorage.setItem('apiCalls', currentCalls.toString());

        let map: mapgl.Map | undefined = undefined;
        let clusterer: Clusterer | undefined = undefined;

        load().then((mapgl) => {
            map = new mapgl.Map('map-container', {
                center: MAP_CENTER,
                zoom: 15,
                key: API_KEY,
            });

            const markers = [
                { 
                    coordinates: [37.62007017741414, 55.76074512788935],
                    icon: mapMarkerSvg
                },
                { 
                    coordinates: [37.62646456511692, 55.7533556513168],
                    icon: mapMarkerSvg
                },
                { 
                    coordinates: [37.61556407026668, 55.75139938101164],
                    icon: mapMarkerSvg
                },
            ];
    
            clusterer = new Clusterer(map, {
                radius: 60,
            });
            clusterer.load(markers);
        });
        
        // Destroy the map, if Map component is going to be unmounted
        return () => {
            map && map.destroy();
            clusterer && clusterer.destroy();
        };
    }, []);

    return (
        <div className={styles.map}>
            <MapWrapper />
        </div>
        
    );
};

export default Map;