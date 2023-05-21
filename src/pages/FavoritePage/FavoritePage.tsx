import React, { useEffect } from 'react';
import styles from './FavoritePage.module.css';
import { useMapglContext } from '../../components/Map/MapglContext';
import { createMapMarkersArray } from '../../helpers/createMapMarkersArray';
import { useAppSelector } from '../../redux/typingReduxHooks';
import { useNavigate } from 'react-router-dom';
import { CurrentPlaceType } from '../../types';
import FavPlaceCard from '../../components/FavPlaceCard/FavPlaceCard';
import { getUserFavPlaces } from '../../redux/favorite/actions';
import { useAppDispatch } from '../../redux/typingReduxHooks';
import Loader from '../../components/Loader/Loader';
import { createFavMarkers } from '../../helpers/createFavMarkers';

const FavoritePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { userUid } = useAppSelector((state) => state.authReducer);

    const { isLoading, favPlaces, favId } = useAppSelector((state) => state.favoriteReducer);

    useEffect(() => {
        if (clusterer !== undefined) {
            clusterer.load(createFavMarkers(favId, favPlaces));
        }
        dispatch(getUserFavPlaces(userUid));
    }, []);

    const { clusterer } = useMapglContext();
    const { markerPlaces } = useAppSelector((state) => state.placesReducer);
    const handleReturnToMainPageClick = () => {
        if (clusterer !== undefined) {
            clusterer.load(createMapMarkersArray(markerPlaces));
        }
        navigate('/main');
    };

    return (
        <div className={styles.wrapper}>
            <div onClick={handleReturnToMainPageClick} className={styles.navigation}>
                Назад
            </div>
            <h1 className={styles.title}>Избранное</h1>
            {isLoading ? (
                <Loader />
            ) : favId.length ? (
                <div className={styles.favList}>
                    {favId.map((placeId) => {
                        const curPlace: CurrentPlaceType = favPlaces[placeId as keyof typeof favPlaces];
                        return (
                            <FavPlaceCard
                                key={placeId}
                                rating={curPlace.rating}
                                reviewsAmount={curPlace.reviewsAmount}
                                name={curPlace.name}
                                address={curPlace.address}
                                photo={curPlace.photo}
                                id={curPlace.id}
                            />
                        );
                    })}
                </div>
            ) : (
                <h2 className={styles.notFound}>Тут ничего нет</h2>
            )}
        </div>
    );
};

export default FavoritePage;
