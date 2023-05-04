import React from 'react';
import styles from './Places.module.css';

import Category from '../Category/Category';
import Filter from '../Filter/Filter';
import PlaceCard from '../PlaceCard/PlaceCard';

import { typesOfPlaces, typesOfFilters, mockPlaces } from '../../constants';


const Places: React.FC = () => {

    return (
        <div className={styles.places}>
            <div className={styles.categories}>
                {typesOfPlaces.map((type) =>
                    <Category key={type.id} {...type} />
                )}
            </div>
            <h1 className={styles.title}>Нашли 4 места</h1>
            <div className={styles.filters}>
                {typesOfFilters.map((type) =>
                    <Filter key={type.id} {...type} />
                )}
            </div>
            <a href='#!' className={styles.placesCards}>
                {mockPlaces.map((place) =>
                    <PlaceCard key={place.id} {...place}/>
                )}
            </a>
        </div>
    );
};

export default Places;