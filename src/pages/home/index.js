import React, {useEffect, useMemo, useState} from 'react';
import Genres from "../../components/home/genres";
import Movies from "../../components/home/movies";
import './style.scss';
import {API_KEY, API_URL} from "../../constants";
import Loader from "../../components/loader";
import Cookies from 'js-cookie';

const Home = () => {
    const [genres, setGenres] = useState();
    const [active, setActive] = useState(genres?.[0]);
    const [movies, setMovies] = useState();
    const [loading, setLoading] = useState(false);
    
    const requestGenres = () => {
        setLoading(true)
        fetch(API_URL + `genre/movie/list?api_key=${API_KEY}&language=en-US`)
            .then(res => res.json())
            .then(data => {
                setGenres(data.genres)
                setActive(data.genres[0])
                setLoading(false)
            })
    }

    const requestMovies = (page) => {
        setLoading(true)
        fetch(API_URL + `discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${active?.id || ''}&page=${page}`)
            .then(res => res.json())
            .then(data => {

                setMovies({...data, results: page !== 1 ? [...movies.results, ...data.results] : data.results})
                setLoading(false)
            })
    }

    useEffect(() => {
        requestGenres()
    }, []);

    useEffect(() => {
        active && requestMovies(1)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [active])

    return (
        <>
            {loading ? <Loader /> : (
                <div className='home_page'>
                    <Genres genres={genres} active={active} setActive={setActive}/>
                    <Movies movies={movies} genre={active?.name} requestMovies={requestMovies}/>
                </div>
            )}
        </>
    );
};

export default Home;
