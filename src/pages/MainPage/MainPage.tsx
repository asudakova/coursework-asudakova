import React from 'react';
import styles from './MainPage.module.css';
import PlacesPage from '../PlacesPage/PlacesPage';
import { Routes, Route } from 'react-router-dom';
import PlaceInfoPage from '../PlaceInfoPage/PlaceInfoPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Header from '../../components/Header/Header';
import Map from '../../components/Map/Map';
import FavoritePage from '../FavoritePage/FavoritePage';
import FavPlaceInfoPage from '../FavPlaceInfoPage/FavPlaceInfoPage';

const MainPage: React.FC = () => {
    return (
        <>
            <Header />
            <div className={styles.wrapper}>
                <Routes>
                    <Route path="" element={<PlacesPage />} />
                    <Route path="place/:placeId" element={<PlaceInfoPage />} />
                    <Route path="favorite" element={<FavoritePage />} />
                    <Route path="favorite/place/:placeId" element={<FavPlaceInfoPage />} />
                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>

                <Map />
            </div>
        </>
    );
};

export default MainPage;
