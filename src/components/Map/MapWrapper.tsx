import React from 'react';
import styles from './Map.module.css'

//в документации рекомендуют делать этот компонент, чтобы избежать повторного рендеринга карты
export const MapWrapper = React.memo(
    () => {
        return (
        <div
            id='map-container' className={styles.mapWrapper}
        >
        </div>
        )
    },
    () => true,
);