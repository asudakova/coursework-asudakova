import React from 'react';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import './App.module.css'

const App: React.FC = () => {

    return (
        <>
            <Header />
            <MainPage />
        </>
    )
}

export default App
