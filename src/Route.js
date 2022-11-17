import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import Movie from "./pages/movie/[id]";

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movie/:id' element={<Movie />} />
        </Routes>
    );
};

export default Routers;