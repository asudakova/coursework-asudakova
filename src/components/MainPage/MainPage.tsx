import React from 'react';
import styles from './MainPage.module.css';
import Places from '../Places/Places';
import Map from '../Map/Map';

const MainPage: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <Places />
            <Map />
        </div>
    );
};

export default MainPage;