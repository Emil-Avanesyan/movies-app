import React from 'react';
import './style.scss';
import Movie from './Movie';

const Movies = ({movies, genre, requestMovies}) => {
    
    return (
        <>
            <div className='movies_block'>
                <h1>
                    {genre}
                </h1>
                <div className='movies'>
                    {movies?.results.map((movie, idx) => (
                        <Movie movie={movie} key={movie.id + idx} />
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
