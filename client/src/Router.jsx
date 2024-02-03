import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './context/AuthContext';
import DetailsPage from './pages/DetailsPage';


export const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login onLoginNavigateTo="/details" />} />
                <Route path="/details" element={<DetailsPage />} />
            </Routes>
        </>
    );
};