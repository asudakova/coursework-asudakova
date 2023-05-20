import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/typingReduxHooks';
import { loginUser, loginAfterRefresh } from '../../redux/auth/actions';
import Loader from '../../components/Loader/Loader';
import styles from './FormPages.module.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const SignInPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userUid = user.uid;
            const userName = user.displayName;
            if (userName) {
                dispatch(loginAfterRefresh(userName, userUid));
                navigate('/main');
            }
        }
    });

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState('');

    const { loginErrorforUser, userName, isLoginLoading } = useAppSelector((state) => state.authReducer);

    const handleSubmit = (e: React.FormEvent) => {
        setError('');
        e.preventDefault();
        dispatch(loginUser(email, password));
    };

    useEffect(() => {
        if (loginErrorforUser !== '') {
            setError(loginErrorforUser);
        }
    }, [loginErrorforUser]);

    useEffect(() => {
        if (userName !== '') {
            navigate('/main');
        }
    }, [userName]);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Добро пожаловать!</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                {isLoginLoading ? (
                    <Loader />
                ) : (
                    <>
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
                        {error !== '' && <div className={styles.error}>{error}</div>}
                        <button type="submit" className={styles.btn}>
                            Войти
                        </button>
                    </>
                )}
            </form>
            <div className={styles.aboutSignup}>
                <span>Не зарегистрированы?</span>
                <Link to={`/signup`}>Зарегистрироваться</Link>
            </div>
        </div>
    );
};

export default SignInPage;
