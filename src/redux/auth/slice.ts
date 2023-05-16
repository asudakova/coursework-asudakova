import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStateType } from '../../types';

const initialState: AuthStateType = {
    userName: '',

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
        userCtreatingSuccess(state, action: PayloadAction<string>) {
            state.isSignupLoading = false;
            state.signupError = '';
            state.userName = action.payload;
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
        userLoggingSuccess(state, action: PayloadAction<string>) {
            state.isLoginLoading = false;
            state.loginError = '';
            state.userName = action.payload;
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
            state.loginErrorforUser = '';
            state.signupErrorforUser = '';
        },
    },
});

export default authSlice.reducer;
