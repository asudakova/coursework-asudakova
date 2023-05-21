import React from 'react';
import { useAppSelector } from '../../redux/typingReduxHooks';
import styles from './MarkerTip.module.css';
import { CurrentPlaceType } from '../../types';
//@ts-ignore
import StarRatings from 'react-star-ratings';

const MarkerTip: React.FC = () => {
    const { isHover, id, coordinates } = useAppSelector((state) => state.markerReducer);
    const placeInfo: CurrentPlaceType = useAppSelector(
        (state) => state.placesReducer.mapPlaces[id as keyof typeof state.placesReducer.mapPlaces]
    );
    const offset = 5;
    let style = {
        top: `${coordinates[1] + offset}px`,
        left: `${coordinates[0] + offset}px`,
        display: 'flex',
    };

    return (
        <>
            {isHover && (
                <div className={styles.tip} style={style}>
                    <span className={styles.title}>{placeInfo.shortName}</span>
                    {placeInfo.rating && (
                        <StarRatings
                            rating={placeInfo.rating}
                            starRatedColor="#5843BE"
                            starEmptyColor="#86838C"
                            numberOfStars={5}
                            starDimension="15px"
                            starSpacing="1px"
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default MarkerTip;
