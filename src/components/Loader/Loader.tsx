import React from 'react';
import styles from './Loader.module.css';

const Loader: React.FC = () => {
    return (
        <div className={styles.loader}>
            <svg className={styles.circular_loader} viewBox="25 25 50 50">
                <circle
                    className={styles.loader_path}
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                ></circle>
            </svg>
        </div>
    );
};

export default Loader;
