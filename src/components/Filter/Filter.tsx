import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../redux/typingReduxHooks';
import { setNewSort } from '../../redux/places/actions';
import { FilterPropsType } from '../../types';
import styles from './Filter.module.css';

const Filter: React.FC<FilterPropsType> = ({ title, shortCut }) => {
    const dispatch = useAppDispatch();
    const currentSort = useAppSelector((state) => state.placesReducer.sortBy);

    return (
        <div
            onClick={() => dispatch(setNewSort(shortCut))}
            className={cn(styles.filter, currentSort === shortCut ? styles.active : styles.inactive)}
        >
            {title}
        </div>
    );
};

export default Filter;
