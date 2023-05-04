import React from 'react';
import styles from './Header.module.css';
import logo from '../../img/logo.png';
import Input from '../Input/Input';
import { UilMoon, UilHeartAlt, UilUserCircle } from '@iconscout/react-unicons'

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
                    <UilMoon className={styles.darkThemeBtn}/>
                    <UilHeartAlt className={styles.favBtn}/>
                    <UilUserCircle className={styles.profileBtn}/>
                </div>
            </div>
        </div>
    );
};

export default Header;