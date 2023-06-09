import React from 'react';
import styles from './Map.module.css';

export const MapWrapper = React.memo(
    () => {
        return <div id="map-container" className={styles.mapWrapper}></div>;
    },
    () => true
);
