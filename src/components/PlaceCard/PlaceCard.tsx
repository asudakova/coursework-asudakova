import React from 'react';
import styles from './PlaceCard.module.css';
//@ts-ignore
import { UilHeartAlt } from '@iconscout/react-unicons';
//@ts-ignore
import StarRatings from 'react-star-ratings';

import { PlaceCardPropsType } from '../../types';

const PlaceCard: React.FC<PlaceCardPropsType> = ({ rating, reviewsAmount, name, address, photo }) => {
    return (
        <div className={styles.placeCard}>
            {/* <UilHeartAlt className={isFav ? styles.fav : styles.noFav} /> */}
            {photo[0] !== undefined
                ? <img src={photo[0]} alt={name} className={styles.pic} />
                : <div className={styles.noPic}></div>
            }
            <div className={styles.placeInfo}>
                {rating &&
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
                }
                <h2 className={styles.name}>{name}</h2>
                <span className={styles.address}>{address}</span>
            </div>
        </div>
    );
};

export default PlaceCard;