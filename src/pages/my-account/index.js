import Cookies from 'js-cookie';
import { useState } from 'react';
import './style.scss';
import Movie from '../../components/home/movies/Movie'

const MyAccount = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const tabsData = [
        {
            title: 'My account',
            type: 'account'
        },
        {
            title: 'Wishlist',
            type: 'wishlist'
        },
    ]
    const [active, setActive] = useState(tabsData[0].type)
    console.log(user)
    return(
        <div className="account_page">
            <ul className='tabs'>
                {tabsData.map((tab, idx) => (
                    <li key={tab.type + idx} className={`nth_tab ${active === tab.type ? 'active' : ''}`} onClick={() => setActive(tab.type)}>{tab.title}</li>
                ))}
            </ul>
            {active === 'account' ? (
                <div className='my_account'>
                    <div className='user_info'>
                        <h1>My account</h1>
                        <div className='nth_info'>
                            <h3>Name</h3>
                            <h3>{user.name}</h3>
                        </div>
                        <div className='nth_info'>
                            <h3>Lastname</h3>
                            <h3>{user.lastname}</h3>
                        </div>
                        <div className='nth_info'>
                            <h3>Email</h3>
                            <h3>{user.email}</h3>
                        </div>
                        <div className='nth_info'>
                            <h3>Phone</h3>
                            <h3>{user.phone}</h3>
                        </div>
                    </div>
                    </div>
               
            ) : (
                <div className='favourite_empty'>
                    <h1>Favourite Movies</h1>
                    <div className='movies'>
                        {user.wishList?.length ? user.wishList.map((movie, idx) => {
                            return (
                                <Movie movie={movie} key={movie.id + idx} />
                            )
                        }) : (
                        <div>
                            <h2>Favourite List is still empty</h2>
                            </div>)}
                            
                    </div>
                    
                </div>
            )}
            
        </div>
    )
}

export default MyAccount;