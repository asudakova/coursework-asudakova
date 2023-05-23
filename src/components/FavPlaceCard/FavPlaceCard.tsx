import React from 'react';
import styles from './FavPlaceCard.module.css';
import { PlaceCardPropsType } from '../../types';
//@ts-ignore
import { UilTimes } from '@iconscout/react-unicons';
//@ts-ignore
import StarRatings from 'react-star-ratings';
import { getDeclension } from '../../helpers/getDeclension';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/typingReduxHooks';
import { removeFavPlace } from '../../redux/favorite/actions';

const FavPlaceCard: React.FC<PlaceCardPropsType> = ({ rating, reviewsAmount, name, address, photo, id }) => {
    const dispatch = useAppDispatch();

    const { userUid } = useAppSelector((state) => state.authReducer);

    const handleDeleteClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        dispatch(removeFavPlace(id, userUid));
    };

    return (
        <Link to={`/main/favorite/place/${id}`}>
            <div className={styles.placeCard}>
                {photo ? (
                    <div className={styles.picWrapper}>
                        <img src={photo} alt={name} className={styles.pic} />
                    </div>
                ) : (
                    <div className={styles.noPic}></div>
                )}
                <div className={styles.placeInfo}>
                    <h2 className={styles.name}>{name}</h2>
                    {rating && reviewsAmount && (
                        <div className={styles.rating}>
                            <StarRatings
                                rating={rating}
                                starRatedColor="#5843BE"
                                starEmptyColor="#86838C"
                                numberOfStars={5}
                                starDimension="18px"
                                starSpacing="1px"
                            />
                            <span className={styles.review}>
                                ({reviewsAmount}{' '}
                                {['отзыв', 'отзыва', 'отзывов'][getDeclension(reviewsAmount)]})
                            </span>
                        </div>
                    )}
                    <span className={styles.address}>{address}</span>
                </div>
                <UilTimes onClick={handleDeleteClick} className={styles.delete} />
            </div>
        </Link>
    );
};

export default FavPlaceCard;
