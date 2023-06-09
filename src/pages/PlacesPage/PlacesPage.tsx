import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/typingReduxHooks';
import Category from '../../components/Category/Category';
import Loader from '../../components/Loader/Loader';
import FoundPlaces from '../../components/FoundPlaces/FoundPlaces';
import { fetchNextPage, fetchPlaces, setNewPageNumber } from '../../redux/places/actions';
import { typesOfPlaces } from '../../constants';
//@ts-ignore
import { UilArrowUp } from '@iconscout/react-unicons';
//@ts-ignore
import debounce from 'lodash.debounce';
import styles from './PlacesPage.module.css';
import { getUserFavPlaces } from '../../redux/favorite/actions';

const Places: React.FC = () => {
    const { userUid } = useAppSelector((state) => state.authReducer);

    useEffect(() => {
        dispatch(getUserFavPlaces(userUid));
    }, []);

    const dispatch = useAppDispatch();
    const { north, east, south, west } = useAppSelector((state) => state.coordinatesReducer.boundaries);
    const { isLoading, category, sortBy, pageNumber, totalCount } = useAppSelector(
        (state) => state.placesReducer
    );

    const topRef = useRef<HTMLDivElement>(null);
    const blockRef = useRef<HTMLDivElement>(null);

    const [showButton, setShowButton] = useState(false);
    const displayAfter = 150;

    useEffect(() => {
        dispatch(setNewPageNumber(1));
        dispatch(fetchPlaces({ north, east, south, west, category, sortBy }));
    }, [north, east, south, west, category, sortBy]);

    const handleInfiniteScroll = useCallback(
        debounce(() => {
            const limit = 10;
            const amountOfPages = Math.ceil(totalCount / limit);
            if (
                blockRef.current?.scrollHeight !== undefined &&
                blockRef.current?.clientHeight !== undefined &&
                blockRef.current?.scrollTop !== undefined
            ) {
                if (
                    blockRef.current?.scrollHeight -
                        (blockRef.current?.clientHeight + blockRef.current?.scrollTop) <
                        150 &&
                    pageNumber > 0 &&
                    amountOfPages > pageNumber
                ) {
                    dispatch(
                        fetchNextPage({
                            north,
                            east,
                            south,
                            west,
                            category,
                            sortBy,
                            pageNumber: pageNumber + 1,
                        })
                    );
                }
                if (!showButton && blockRef.current.scrollTop > displayAfter) {
                    setShowButton(true);
                }
                if (!showButton && blockRef.current.scrollTop <= displayAfter) {
                    setShowButton(false);
                }
            }
        }, 250),
        [pageNumber, showButton, totalCount]
    );

    useEffect(() => {
        blockRef.current?.addEventListener('scroll', handleInfiniteScroll);
        return () => {
            blockRef.current?.removeEventListener('scroll', handleInfiniteScroll);
        };
    }, [handleInfiniteScroll]);

    const scrollFunc = (target: React.RefObject<HTMLDivElement>, block: React.RefObject<HTMLDivElement>) => {
        if (target.current?.offsetTop !== undefined) {
            block.current?.scrollTo({
                top: target.current?.offsetTop - 50,
                behavior: 'smooth',
            });
        }
    };

    const handleScroll = () => {
        if (blockRef.current?.scrollTop !== undefined) {
            if (!showButton && blockRef.current.scrollTop > displayAfter) {
                setShowButton(true);
            }
            if (!showButton && blockRef.current.scrollTop <= displayAfter) {
                setShowButton(false);
            }
        }
    };

    useEffect(() => {
        blockRef.current?.addEventListener('scroll', handleScroll);
        return () => {
            blockRef.current?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={blockRef} className={styles.places}>
            <div ref={topRef} className={styles.categories}>
                {typesOfPlaces.map((type) => (
                    <Category key={type.id} {...type} />
                ))}
            </div>
            {isLoading ? <Loader /> : <FoundPlaces />}
            {showButton && (
                <UilArrowUp onClick={() => scrollFunc(topRef, blockRef)} className={styles.arrowUp} />
            )}
        </div>
    );
};

export default Places;
