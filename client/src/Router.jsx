import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './context/AuthContext';
import DetailsPage from './pages/DetailsPage';
import Intro from './pages/Intro';
import ChatPDF from './pages/ChatPDF';
import ChatUI from './pages/ChatUI';
import ChatReport from './pages/ChatReport';

export const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login onLoginNavigateTo="/intro" />} />
                <Route path="/details" element={<DetailsPage />} />
                <Route path="/intro" element={<Intro />} />
                <Route path="/chat-pdf" element={<ChatPDF />} />
                <Route path="/chat-ui" element={<ChatUI />} />
                <Route path='/chatreport' element={<ChatReport />} />
            </Routes>
        </>
    );
};