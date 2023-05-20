import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStateType } from '../../types';

const initialState: AuthStateType = {
    userName: '',
    userUid: '',

    isSignupLoading: false,
    signupError: '',
    signupErrorforUser: '',

    isLoginLoading: false,
    loginError: '',
    loginErrorforUser: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userCreating(state) {
            state.isSignupLoading = true;
        },
        userCtreatingSuccess(state, action: PayloadAction<{userName: string, userUid: string}>) {
            state.isSignupLoading = false;
            state.signupError = '';
            state.userName = action.payload.userName;
            state.userUid = action.payload.userUid;
        },
        userCreatingError(state, action: PayloadAction<string>) {
            state.isSignupLoading = false;
            state.signupError = action.payload;
        },
        userCreatingErrorForUser(state, action: PayloadAction<string>) {
            state.isSignupLoading = false;
            state.signupErrorforUser = action.payload;
        },
        userLogging(state) {
            state.isLoginLoading = true;
        },
        userLoggingSuccess(state, action: PayloadAction<{userName: string, userUid: string}>) {
            state.isLoginLoading = false;
            state.loginError = '';
            state.userName = action.payload.userName;
            state.userUid = action.payload.userUid;
        },
        userLoggingError(state, action: PayloadAction<string>) {
            state.isLoginLoading = false;
            state.loginError = action.payload;
        },
        userLoggingErrorForUser(state, action: PayloadAction<string>) {
            state.isLoginLoading = false;
            state.loginErrorforUser = action.payload;
        },
        userLogout(state) {
            state.userName = '';
            state.userUid = '';
            state.loginErrorforUser = '';
            state.signupErrorforUser = '';
        },
    },
});

export default authSlice.reducer;
