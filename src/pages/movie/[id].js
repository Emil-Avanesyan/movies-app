import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {API_KEY, API_URL} from "../../constants";
import './style.scss';
import StarSrc from "../../assets/images/star.png";

const Movie = () => {
    const [movie, setMovie] = useState();
    const {id} = useParams();
    const requestMovie = () => {
        fetch(API_URL + `movie/${id}?api_key=${API_KEY}&language=en-US`)
            .then(res => res.json())
            .then(data => {
                setMovie(data)
            })
    }

    useEffect(() => {
        requestMovie()
    }, []);

    return (
        <div className='movie_page'>
            {movie ? (
                <>
                    <div className='images'>
                        <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt='Movie' />
                    </div>
                    <div className='info'>
                        <div className='title'>
                            <h1>{movie.title}</h1>
                            <div className='review'>
                                <img src={StarSrc} alt='Star'/>
                                <span>{movie.vote_average}</span>
                            </div>
                        </div>
                        <h2 className='desc'>{movie.tagline}</h2>
                        <h3 className='overview'>{movie.overview}</h3>

                        <div className='date'>
                            <h3>First release:</h3>
                            <h3>{movie.release_date}</h3>
                        </div>
                        <div className='genres_field'>
                            <span>Genres:</span>
                            <div className='genres'>
                                {movie.genres.map((genre, idx) => (
                                    <span key={genre.id + idx}>{genre.name}</span>
                                ))}
                            </div>
                        </div>
                        <div className='btn'>
                            <a href={movie.homepage} target='_blank'>Watch Now</a>
                        </div>
                    </div>
                </>

            ) : null}
            
        </div>
    );
};

    export default Movie;