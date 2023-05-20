import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/typingReduxHooks';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { userUid } = useAppSelector((state) => state.authReducer);

    if (!userUid) {
        <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
