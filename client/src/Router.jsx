import { Routes, Route } from 'react-router-dom'



export const Router = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
            </Routes>
        </>
    );
};