import React from 'react';
import styles from './Input.module.css'
import { UilSearch, UilMapMarker } from '@iconscout/react-unicons';

const Input: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.search}>
            <input
                type="text"
                className={styles.input}
                placeholder='Введите место...'
            />
            <UilSearch className={styles.searchBtn}/>
            </div>
            <UilMapMarker className={styles.locationBtn}/>
        </div>
    );
};

export default Input;