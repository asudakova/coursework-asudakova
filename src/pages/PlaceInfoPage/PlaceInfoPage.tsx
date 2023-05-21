import React, { useEffect, useState } from 'react';
import styles from './PlaceInfoPage.module.css';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/typingReduxHooks';
import { CurrentPlaceType, InfoForMarkerType } from '../../types';
//@ts-ignore
import { UilHeartAlt } from '@iconscout/react-unicons';
//@ts-ignore
import StarRatings from 'react-star-ratings';
import { getDeclension } from '../../helpers/getDeclension';
import { useMapglContext } from '../../components/Map/MapglContext';
import { createMapMarkersArray } from '../../helpers/createMapMarkersArray';
import { categories } from '../../constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { addFavPlace, removeFavPlace } from '../../redux/favorite/actions';

const PlacePage: React.FC = () => {
    const navigate = useNavigate();
    const { clusterer } = useMapglContext();
    let { placeId } = useParams<{ placeId: string }>();

    const curPlace: CurrentPlaceType = useAppSelector(
        (state) => state.placesReducer.mapPlaces[placeId as keyof typeof state.placesReducer.mapPlaces]
    );

    const { state } = useLocation();

    const favId = useAppSelector((state) => state.favoriteReducer.favId);
    const setFavId = new Set(favId);

    const [isFav, setIsFav] = useState(false);

    const { userUid } = useAppSelector((state) => state.authReducer);

    const { mapPlaces } = useAppSelector((state) => state.placesReducer);

    useEffect(() => {
        if (placeId) {
            setIsFav(setFavId.has(placeId));
        }
    }, []);

    const dispatch = useAppDispatch();

    const handleFavClick = () => {
        if (placeId) {
            if (isFav) {
                setIsFav(!isFav);
                dispatch(removeFavPlace(placeId, userUid));
            } else {
                setIsFav(isFav);
                const newPlace = mapPlaces[placeId as keyof typeof mapPlaces];
                dispatch(addFavPlace(placeId, userUid, newPlace));
            }
        }
    };

    const { category, markerPlaces } = useAppSelector((state) => state.placesReducer);

    const markerCoords: InfoForMarkerType = {
        lat: curPlace.latLon[1],
        lon: curPlace.latLon[0],
    };

    if (clusterer !== undefined) {
        clusterer.load(createMapMarkersArray([markerCoords]));
    }

    const createMarkup = (text: string) => {
        return { __html: text };
    };

    const handleReturnToMainPageClick = () => {
        if (clusterer !== undefined) {
            clusterer.load(createMapMarkersArray(markerPlaces));
        }
        navigate('/main');
    };

    const handleReturnToFavPageClick = () => {
        navigate('/main/favorite');
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.navigation}>
                <div
                    onClick={state == 'fav' ? handleReturnToFavPageClick : handleReturnToMainPageClick}
                    className={styles.link}
                >
                    {state == 'fav' ? 'Избранное' : categories[category]}
                </div>
                <span className={styles.linkName}>
                    {curPlace.shortName ? curPlace.shortName : curPlace.name}
                </span>
            </div>
            {curPlace.photo && (
                <div className={styles.photos}>
                    <img src={curPlace.photo} alt="Place photo" className={styles.photo} />
                </div>
            )}
            <div className={styles.info}>
                <div className={styles.titleWrapper}>
                    {curPlace.nameExtension && curPlace.shortName ? (
                        <h1 className={styles.title}>
                            {curPlace.shortName}
                            <span>&#160;{curPlace.nameExtension}</span>
                        </h1>
                    ) : (
                        <h1 className={styles.title}>{curPlace.name}</h1>
                    )}
                    <UilHeartAlt onClick={handleFavClick} className={isFav ? styles.fav : styles.noFav} />
                </div>
                {curPlace.rating && curPlace.reviewsAmount && (
                    <div className={styles.rating}>
                        <StarRatings
                            className={styles.stars}
                            rating={curPlace.rating}
                            starRatedColor="#5843BE"
                            starEmptyColor="#86838C"
                            numberOfStars={5}
                            starDimension="18px"
                            starSpacing="1px"
                        />
                        <span className={styles.review}>
                            ({curPlace.reviewsAmount}{' '}
                            {['отзыв', 'отзыва', 'отзывов'][getDeclension(curPlace.reviewsAmount)]})
                        </span>
                    </div>
                )}
            </div>
            <div className={styles.address}>{curPlace.address}</div>
            {curPlace.description && (
                <div
                    className={styles.description}
                    dangerouslySetInnerHTML={createMarkup(curPlace.description)}
                ></div>
            )}
            <div className={styles.schedule}>
                <h2 className={styles.scheduleTitle}>Время работы</h2>
                {Object.keys(curPlace.workingHours).map((day, index) => {
                    const curDayHours = curPlace.workingHours[day as keyof typeof curPlace.workingHours];
                    return (
                        <div key={index} className={styles.scheduleLine}>
                            <span className={styles.day}>{day}</span>
                            {curDayHours[0] === '' ? '' : curDayHours[0]}-
                            {curDayHours[1] === '' ? '' : curDayHours[1]}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlacePage;
