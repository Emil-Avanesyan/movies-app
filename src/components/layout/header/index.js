import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import '../../../styles/_variables.scss';
import LogoSrc from '../../../assets/images/logo.png';
import {Link, useNavigate} from "react-router-dom";
import SignInPopup from '../../popups/signInPopup';
import Cookies from 'js-cookie';

const Header = () => {
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState(Cookies.get('authorization'));
    const ref = useRef();
    const [openPopup, setOpenPopup] = useState(false);

    const handleLogout = () => {
        Cookies.remove('authorization');
        navigate('/')
        navigate(0)
    }

    useEffect(() => {
        setIsLogged(Cookies.get('authorization'))
    }, [Cookies.get('authorization')])

    return (
        <header>
            <div className='header_main'>
                <Link to='/'>
                    <div>
                        <img src={LogoSrc} alt='Logo' />
                    </div>
                </Link>
                <div className='icons_section'>
                    <div className='login_icon'>
                        {isLogged ? (
                            <Link to='/my-account'>
                                <div>
                                    <span className="icon icon-user"></span>
                                </div>
                            </Link>

                        ) : (
                            <span className="icon icon-enter" onClick={(e) => setOpenPopup(true)}></span>
                        )}
                    </div>
                    {isLogged && <span className="icon icon-exit" onClick={handleLogout}></span>}
                    
                </div>
            </div>
            
            {openPopup && <SignInPopup popupRef={ref} setOpenPopup={setOpenPopup} />}
                
        </header>
    );
};

export default Header;