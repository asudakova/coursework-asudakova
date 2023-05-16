import React from 'react';
import styles from './PlaceInfoPage.module.css';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/typingReduxHooks';
import { CurrentPlaceType } from '../../types';
import { Link } from 'react-router-dom';
//@ts-ignore
import { UilHeartAlt } from '@iconscout/react-unicons';
//@ts-ignore
import StarRatings from 'react-star-ratings';
import { getDeclension } from '../../helpers/getDeclension';

const categories = {
    food: 'Еда',
    ent: 'Развлечения',
    hotels: 'Отели',
    attr: 'Достопримечательности',
};

const PlacePage: React.FC = () => {
    const { placeId } = useParams<{ placeId: string }>();
    const curPlace: CurrentPlaceType = useAppSelector(
        (state) =>
            state.placesReducer.mapPlaces[
                placeId as keyof typeof state.placesReducer.mapPlaces
            ]
    );
    const curCategory = useAppSelector((state) => state.placesReducer.category);

    const createMarkup = (text: string) => {
        return { __html: text };
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.navigation}>
                <Link to="/" className={styles.link}>
                    {categories[curCategory]}
                </Link>
                <span className={styles.linkName}>
                    {curPlace.shortName ? curPlace.shortName : curPlace.name}
                </span>
            </div>
            <div className={styles.photos}>
                <img
                    src={curPlace.photo[0]}
                    alt="Place photo"
                    className={styles.photo}
                />
            </div>
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
                    <UilHeartAlt className={styles.fav} />
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
                            {
                                ['отзыв', 'отзыва', 'отзывов'][
                                    getDeclension(curPlace.reviewsAmount)
                                ]
                            }
                            )
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
                    const curDayHours =
                        curPlace.workingHours[
                            day as keyof typeof curPlace.workingHours
                        ];
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
