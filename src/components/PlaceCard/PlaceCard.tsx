import React from 'react';
import styles from './PlaceCard.module.css';
import { UilHeartAlt } from '@iconscout/react-unicons';
import StarRatings from 'react-star-ratings';

type PlaceCardProps = {
    rating: number,
    reviews: number,
    name: string,
    address: string,
    pic?: string,
    isFav: boolean
}

const PlaceCard: React.FC<PlaceCardProps> = ({ rating, reviews, name, address, pic, isFav }) => {
    return (
        <div className={styles.placeCard}>
            <UilHeartAlt className={isFav ? styles.fav : styles.noFav} />
            {pic !== undefined
                ? <img src={pic} alt={name} className={styles.pic} />
                : <div className={styles.noPic}></div>
            }
            <div className={styles.placeInfo}>
                <div className={styles.rating}>
                    <StarRatings
                        className={styles.stars}
                        rating={rating}
                        starRatedColor="#5843BE"
                        starEmptyColor="#86838C"
                        numberOfStars={5}
                        starDimension="18px"
                        starSpacing="1px"
                    />
                    <span className={styles.review}>({reviews})</span>
                </div>
                <h2 className={styles.name}>{name}</h2>
                <span className={styles.address}>{address}</span>
            </div>
        </div>
    );
};

export default PlaceCard;