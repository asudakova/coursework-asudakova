import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/typingReduxHooks';
import { createUser } from '../../redux/auth/actions';
import Loader from '../../components/Loader/Loader';
import styles from './FormPages.module.css';

const SignUpPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState('');

    const { signupErrorforUser, userName, isSignupLoading } = useAppSelector((state) => state.authReducer);

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
        } else {
            setError('');
            dispatch(createUser(email, password, name));
        }
    };

    useEffect(() => {
        if (signupErrorforUser !== '') {
            setError(signupErrorforUser);
        }
    }, [signupErrorforUser]);

    useEffect(() => {
        if (userName !== '') {
            navigate('/main');
        }
    }, [userName]);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Добро пожаловать!</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                {isSignupLoading ? (
                    <Loader />
                ) : (
                    <>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                            required
                            type="text"
                            placeholder="Имя"
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            required
                            type="email"
                            placeholder="Почта"
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            required
                            type="password"
                            placeholder="Пароль"
                        />
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={styles.input}
                            required
                            type="password"
                            placeholder="Повторите пароль"
                        />
                        {error !== '' && <div className={styles.error}>{error}</div>}
                        <button type="submit" className={styles.btn}>
                            Зарегистрироваться
                        </button>
                    </>
                )}
            </form>
            <div className={styles.aboutSignup}>
                <span>Уже зарегистрированы?</span>
                <Link to={`/`}>Войти</Link>
            </div>
        </div>
    );
};

export default SignUpPage;
