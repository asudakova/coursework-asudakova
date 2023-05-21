import React from 'react';
import styles from './PlaceExtraInfo.module.css';
import { categories } from '../../constants';
//@ts-ignore
import { UilHeartAlt } from '@iconscout/react-unicons';
//@ts-ignore
import StarRatings from 'react-star-ratings';
import { getDeclension } from '../../helpers/getDeclension';
import { PlaceExtraInfoPropsType } from '../../types';

const PlaceExtraInfo: React.FC<PlaceExtraInfoPropsType> = ({
    handleReturnClick,
    handleFavClick,
    isFav,
    category,
    name,
    shortName,
    nameExtension,
    description,
    photo,
    rating,
    reviewsAmount,
    address,
    workingHours
}) => {
    const createMarkup = (text: string) => {
        return { __html: text };
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.navigation}>
                <div onClick={handleReturnClick} className={styles.link}>
                    {category ? categories[category] : 'Избранное'}
                </div>
                <span className={styles.linkName}>{shortName ? shortName : name}</span>
            </div>
            {photo && (
                <div className={styles.photos}>
                    <img src={photo} alt="Place photo" className={styles.photo} />
                </div>
            )}
            <div className={styles.info}>
                <div className={styles.titleWrapper}>
                    {nameExtension && shortName ? (
                        <h1 className={styles.title}>
                            {shortName}
                            <span>&#160;{nameExtension}</span>
                        </h1>
                    ) : (
                        <h1 className={styles.title}>{name}</h1>
                    )}
                    <UilHeartAlt onClick={handleFavClick} className={isFav ? styles.fav : styles.noFav} />
                </div>
                {rating && reviewsAmount && (
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
                        <span className={styles.review}>
                            ({reviewsAmount} {['отзыв', 'отзыва', 'отзывов'][getDeclension(reviewsAmount)]})
                        </span>
                    </div>
                )}
            </div>
            <div className={styles.address}>{address}</div>
            {description && (
                <div className={styles.description} dangerouslySetInnerHTML={createMarkup(description)}></div>
            )}
            <div className={styles.schedule}>
                <h2 className={styles.scheduleTitle}>Время работы</h2>
                {Object.keys(workingHours).map((day, index) => {
                    const curDayHours = workingHours[day as keyof typeof workingHours];
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

export default PlaceExtraInfo;
