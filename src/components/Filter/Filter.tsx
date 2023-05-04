import React, { useState } from 'react';
import cn from 'classnames';
import styles from './Filter.module.css';

type FilterProps = {
    title: string
}

const Filter: React.FC<FilterProps> = ({title}) => {
    const [activeFilter, setActiveFilter] = useState('Рядом');
    
    return (
        <div className={cn(styles.filter, activeFilter === title ? styles.active : styles.inactive)}>
            {title}
        </div>
    );
};

export default Filter;