import { AppDispatch } from '../store';
import { authSlice } from './slice';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

export const createUser = (email: string, password: string, name: string) => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.userCreating());
    try {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                if (auth.currentUser !== null) {
                    const userName = name.trim() || email;
                    const userUid = auth.currentUser.uid;
                    if (userName) {
                        updateProfile(auth.currentUser, {
                            displayName: userName,
                        });
                        dispatch(authSlice.actions.userCtreatingSuccess({ userName, userUid }));

                        const forSave = { userName: userName, userUid: userUid };
                        localStorage.setItem('savedUser', JSON.stringify(forSave));
                    }
                }
            })
            .catch((error) => {
                if (error.code == 'auth/invalid-email') {
                    dispatch(authSlice.actions.userCreatingErrorForUser('Неверная почта'));
                }
                if (error.code == 'auth/weak-password') {
                    dispatch(authSlice.actions.userCreatingErrorForUser('Пароль должен содержать не менее 6 символов'));
                }
                if (error.code == 'auth/email-already-in-use') {
                    dispatch(authSlice.actions.userCreatingErrorForUser('Пользователь с такой почтой уже существует'));
                }
            });
    } catch (e) {
        if (e instanceof Error) {
            dispatch(authSlice.actions.userCreatingError(e.message));
        }
    }
};

export const loginUser = (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.userLogging());
    signInWithEmailAndPassword(auth, email, password);
    try {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const userName = userCredential.user.displayName;
                const userUid = userCredential.user.uid;
                if (userName) {
                    dispatch(authSlice.actions.userLoggingSuccess({ userName, userUid }));
                    const forSave = { userName: userName, userUid: userUid };
                    localStorage.setItem('savedUser', JSON.stringify(forSave));
                }
            })
            .catch((error) => {
                if (error.code == 'auth/wrong-password') {
                    dispatch(authSlice.actions.userLoggingErrorForUser('Введен неверный пароль'));
                }
                if (error.code == 'auth/user-not-found') {
                    dispatch(authSlice.actions.userLoggingErrorForUser('Такого пользователя не существует'));
                }
            });
    } catch (e) {
        if (e instanceof Error) {
            dispatch(authSlice.actions.userLoggingError(e.message));
        }
    }
};

export const loginAfterRefresh = (userName: string, userUid: string) => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.userLoginAfterRefresh({ userName, userUid }));
};

export const logoutUser = () => (dispatch: AppDispatch) => {
    signOut(auth);
    dispatch(authSlice.actions.userLogout());
};
