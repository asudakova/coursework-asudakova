import React from 'react';
import styles from './MainPage.module.css';
import PlacesPage from '../PlacesPage/PlacesPage';
import { Routes, Route } from 'react-router-dom';
import PlaceInfoPage from '../PlaceInfoPage/PlaceInfoPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Header from '../../components/Header/Header';
import Map from '../../components/Map/Map';

const MainPage: React.FC = () => {
    return (
        <>
            <Header />
            <div className={styles.wrapper}>
                <Routes>
                    <Route path="" element={<PlacesPage />} />
                    <Route path="place/:placeId" element={<PlaceInfoPage />} />
                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>

                <Map />
            </div>
        </>
    );
};

export default MainPage;
