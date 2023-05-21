import React from 'react';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter';
import PlaceCard from '../PlaceCard/PlaceCard';
import { getDeclension } from '../../helpers/getDeclension';
import { useAppSelector } from '../../redux/typingReduxHooks';
import { typesOfFilters } from '../../constants';
import { CurrentPlaceType } from '../../types';
import styles from './FoundPlaces.module.css';

const FoundPlaces: React.FC = () => {
    const { mapPlaces, listIdPlaces } = useAppSelector((state) => state.placesReducer);
    const { totalCount } = useAppSelector((state) => state.placesReducer);

    const favId = useAppSelector((state) => state.favoriteReducer.favId);
    const setFavId = new Set(favId);

    return (
        <div>
            {totalCount === 0 ? (
                <h1 className={styles.notFound}>К сожалению, мы ничего не нашли</h1>
            ) : (
                <>
                    <h1 className={styles.title}>
                        Нашли {totalCount} {['место', 'места', 'мест'][getDeclension(totalCount)]}
                    </h1>
                    <div className={styles.filters}>
                        {typesOfFilters.map((type) => (
                            <Filter key={type.id} {...type} />
                        ))}
                    </div>
                    <div className={styles.placesCards}>
                        {listIdPlaces &&
                            listIdPlaces.map((placeId) => {
                                const curPlace: CurrentPlaceType = mapPlaces[placeId];
                                return (
                                    <Link key={placeId} to={`place/${curPlace.id}`} state={'main'}>
                                        <PlaceCard
                                            rating={curPlace.rating}
                                            reviewsAmount={curPlace.reviewsAmount}
                                            name={curPlace.name}
                                            address={curPlace.address}
                                            photo={curPlace.photo}
                                            id={placeId}
                                            isFavId={setFavId.has(curPlace.id) ? true : false}
                                        />
                                    </Link>
                                );
                            })}
                    </div>
                </>
            )}
        </div>
    );
};

export default FoundPlaces;
