import React, {useEffect, useMemo, useState} from 'react';
import Genres from "../../components/home/genres";
import Movies from "../../components/home/movies";
import './style.scss';
import {API_KEY, API_URL} from "../../constants";
import Loader from "../../components/loader";

const Home = () => {
    const [genres, setGenres] = useState();
    const [active, setActive] = useState(genres?.[0]);
    const [movies, setMovies] = useState();
    const [page, setPage] = useState(1);
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

    const requestMovies = () => {
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
        requestMovies()
    }, []);

    const memo = useMemo(() => {
        requestMovies()
    }, [active, page])

    const activeMemo = useMemo(() => {
        setPage(1)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [active])

    return (
        <div className='home_page'>
            <Genres genres={genres} active={active} setActive={setActive}/>
            <Movies movies={movies} genre={active?.name} setPage={setPage}/>
        </div>

    );
};

export default Home;