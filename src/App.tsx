import React from 'react';
import SignUpPage from './pages/FormPages/SignUpPage';
import SignInPage from './pages/FormPages/SignInPage';
import MainPage from './pages/MainPage/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './App.module.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/" element={<SignInPage />} />
                <Route
                    path="/main/*"
                    element={
                        <PrivateRoute>
                            <MainPage />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
};

export default App;
