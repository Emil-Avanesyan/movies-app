import React from 'react';
import './style.scss';
import StarSrc from '../../../assets/images/star.png';
import {Link} from "react-router-dom";

const Movies = ({movies, genre, requestMovies}) => {

    return (
        <>
            <div className='movies_block'>
                <h1>
                    {genre}
                </h1>
                <div className='movies'>
                    {movies?.results.map((movie, idx) => (
                        <div key={movie.id + idx} className='movie_nth'>
                            <Link to={`movie/${movie.id}`}>
                                <div className='image'>
                                    <img src={'https://image.tmdb.org/t/p/w500' + movie.backdrop_path} alt='Movie'/>
                                </div>
                            </Link>

                            <div className='movie_info'>
                                <Link to={`movie/${movie.id}`}>
                                    <h2 className='title'>{movie.title}</h2>
                                </Link>
                                <div className='review'>
                                    <img src={StarSrc} alt='Star'/>
                                    <span>{movie.vote_average}</span>
                                </div>
                                <div className='date'>
                                    <h3>First release:</h3>
                                    <h3>{movie.release_date}</h3>
                                </div>
                                <h4 className='description'>{movie.overview}</h4>
                                <span className='favorites'>Favorites</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='page_info'>
                    <h3>{'Showed ' + movies?.page * 20 + ' of ' + movies?.total_results}</h3>
                </div>
                <div className='btn'>
                    <button onClick={() => {
                        requestMovies(++movies.page)
                    }}>Load More</button>
                </div>
            </div>
        </>
    )

};

export default Movies;
