import React, { useState } from 'react';
import cn from 'classnames';
import styles from './Category.module.css';

type CategoryProps = {
    active: string,
    inactive: string,
    title: string
}

const Category: React.FC<CategoryProps> = ({active, inactive, title}) => {
    const [activeCategory, setActiveCategory] = useState('Еда');
    
    return (
        <div
            className={cn(styles.category, activeCategory === title ? styles.active : styles.inactive)}>
            <img
                src={activeCategory === title ? active : inactive}
                alt={title} />
            <span>{title}</span>
        </div>
    );
};

export default Category;