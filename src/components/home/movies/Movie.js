import StarSrc from '../../../assets/images/star.png';
import {Link} from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect, useState, useRef } from 'react';

const Movie = ({movie}) => {
    const isLogged = Cookies.get('authorization');
    const usersData = JSON.parse(localStorage.getItem('users'));
    const user = usersData?.find(item => item.email === Cookies.get('authorization'))
    const [active, setActive] = useState(user?.wishList?.find(item => item.id === movie.id));
    const addToWishList = (e) => {
        e.preventDefault();
        if(isLogged) {
            const usersData = JSON.parse(localStorage.getItem('users'));
            const user = usersData?.find(item => item.email === Cookies.get('authorization'))
            if(user.wishList) {
                user.wishList.push(movie)
    
            }else {
                user.wishList = [movie]
            }
            localStorage.setItem('users', JSON.stringify(usersData))
            localStorage.setItem('user', JSON.stringify(user))
            setActive(true)
        }else {
            document.querySelector('.icon-enter').click()
            
        }
    }

    const removeFromWishList = (e) => {
        e.preventDefault();
        const usersData = JSON.parse(localStorage.getItem('users'));
        const user = usersData?.find(item => item.email === Cookies.get('authorization'))
        if(user) {
            if(user.wishList) {
                const index = user.wishList.findIndex(item => item.id === movie.id);
                user.wishList.splice(index, 1);
                setActive(false)
            }
        }
        localStorage.setItem('users', JSON.stringify(usersData))
        localStorage.setItem('user', JSON.stringify(user))
    }

    return(
        <div className='movie_nth'>
            <div className='image_field'>
                <Link to={`/movie/${movie.id}`}>
                    <div className='image'>
                        <img src={'https://image.tmdb.org/t/p/w500' + movie.backdrop_path} alt='Movie'/>
                    </div>
                </Link>
                <span className={`icon icon-heart ${active ? 'active' : ''}`} onClick={active ? removeFromWishList : addToWishList}></span>
            </div>

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
    )
}

export default Movie;