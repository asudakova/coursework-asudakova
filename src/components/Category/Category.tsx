import React from 'react';
import cn from 'classnames';
import styles from './Category.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/typingReduxHooks';
import { setNewCategory } from '../../redux/places/actions';
import { CategoryPropsType } from '../../types';

const Category: React.FC<CategoryPropsType> = ({active, inactive, title, shortCut}) => {
    const dispatch = useAppDispatch();
    const currentCategory = useAppSelector(state => state.placesReducer.category);
    
    return (
        <div
            onClick={()=>dispatch(setNewCategory(shortCut))}
            className={cn(styles.category, currentCategory === shortCut ? styles.active : styles.inactive)}>
            <img
                src={currentCategory === shortCut ? active : inactive}
                alt={title} />
            <span>{title}</span>
        </div>
    );
};

export default Category;