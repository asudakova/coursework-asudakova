import React, { useEffect } from 'react';
import Input from '../Input/Input';
import { useAppSelector, useAppDispatch } from '../../redux/typingReduxHooks';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/auth/actions';
//@ts-ignore
import { UilHeartAlt, UilUserCircle } from '@iconscout/react-unicons';
//@ts-ignore
import { UilSignOutAlt } from '@iconscout/react-unicons';
import { logo } from '../../img';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { userName } = useAppSelector((state) => state.authReducer);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    useEffect(() => {
        if (userName == '') {
            navigate('/');
        }
    }, [userName]);

    return (
        <div className={styles.header}>
            <div className={styles.wrapper}>
                <a href="#!" className={styles.logo}>
                    <img src={logo} className={styles.logoImg} alt="Logo pic" />
                    <span className={styles.logoText}>Where to go</span>
                </a>
                <Input />
                <div className={styles.accountBtns}>
                    <UilHeartAlt className={styles.favBtn} />
                    <div className={styles.profile}>
                        <UilUserCircle className={styles.profileBtn} />
                        <div className={styles.userInfo}>
                            <div className={styles.userName}>{userName || ''}</div>
                            <UilSignOutAlt onClick={handleLogout} className={styles.logountBtn} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
