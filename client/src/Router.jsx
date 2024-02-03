import { Routes, Route } from 'react-router-dom'
import Quiz from './pages/Quiz';



export const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" component={<Quiz />} />
                {/* <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} /> */}
            </Routes>
        </>
    );
};