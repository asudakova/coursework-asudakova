import React, { useEffect, useState } from 'react';
import styles from './PlaceCard.module.css';
//@ts-ignore
import { UilHeartAlt } from '@iconscout/react-unicons';
//@ts-ignore
import StarRatings from 'react-star-ratings';
import { PlaceCardPropsType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/typingReduxHooks';
import { addFavPlace, removeFavPlace } from '../../redux/favorite/actions';

const PlaceCard: React.FC<PlaceCardPropsType> = ({
    rating,
    reviewsAmount,
    name,
    address,
    photo,
    id,
    isFavId,
}) => {
    const [isFav, setIsFav] = useState(isFavId);

    const { userUid } = useAppSelector((state) => state.authReducer);

    const { mapPlaces } = useAppSelector((state) => state.placesReducer);

    useEffect(() => {
        setIsFav(isFavId);
    }, [isFavId]);

    const dispatch = useAppDispatch();

    const handleFavClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (isFav) {
            setIsFav(!isFav);
            dispatch(removeFavPlace(id, userUid));
        } else {
            setIsFav(isFav);
            const newPlace = mapPlaces[id as keyof typeof mapPlaces];
            dispatch(addFavPlace(id, userUid, newPlace));
        }
    };

    return (
        <div className={styles.placeCard}>
            <UilHeartAlt onClick={handleFavClick} className={isFav ? styles.fav : styles.noFav} />
            {photo ? (
                <img src={photo} alt={name} className={styles.pic} />
            ) : (
                <div className={styles.noPic}></div>
            )}
            <div className={styles.placeInfo}>
                {rating && (
                    <div className={styles.rating}>
                        <StarRatings
                            rating={rating}
                            starRatedColor="#5843BE"
                            starEmptyColor="#86838C"
                            numberOfStars={5}
                            starDimension="18px"
                            starSpacing="1px"
                        />
                        <span className={styles.review}>({reviewsAmount})</span>
                    </div>
                )}
                <h2 className={styles.name}>{name}</h2>
                <span className={styles.address}>{address}</span>
            </div>
        </div>
    );
};

export default PlaceCard;
