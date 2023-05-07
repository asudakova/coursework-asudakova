import React from 'react';
import Input from '../Input/Input';
import { UilMoon, UilHeartAlt, UilUserCircle } from '@iconscout/react-unicons';
import { logo } from '../../img'
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.wrapper}>
                <a href='#!' className={styles.logo}>
                    <img
                        src={logo}
                        className={styles.logoImg}
                        alt="Logo pic"
                    />
                    <span className={styles.logoText}>Where to go</span>
                </a>
                <Input />
                <div className={styles.accountBtns}>
                    <UilMoon className={styles.darkThemeBtn} />
                    <UilHeartAlt className={styles.favBtn} />
                    <UilUserCircle className={styles.profileBtn} />
                </div>
            </div>
        </div>
    );
};

export default Header;