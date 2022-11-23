import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import Movie from "./pages/movie/[id]";
import MyAccount from './pages/my-account';

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movie/:id' element={<Movie />} />
            <Route path='/my-account' element={<MyAccount />} />
        </Routes>
    );
};

export default Routers;