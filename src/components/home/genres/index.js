import React, {useEffect, useState} from 'react';
import './style.scss';
import {API_URL, API_KEY} from '../../../constants'

const Genres = ({genres, active, setActive}) => {


    return (
        <div className='genres_block'>
            <h1>Genres</h1>
            <ul className='genres'>
                {genres?.map((genre, idx) => (
                    <li key={genre.id + idx}
                        className={genre.id === active.id ? 'active' : ''}
                        onClick={() => setActive(genre)}
                    >
                        {genre.name}
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default Genres;