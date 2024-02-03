import { Routes, Route } from 'react-router-dom'
import Quiz from './pages/Quiz';

export const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Quiz />} />
            </Routes>
        </>
    );
};