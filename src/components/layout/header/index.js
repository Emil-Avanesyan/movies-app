import React from 'react';
import './style.scss';
import '../../../styles/_variables.scss';
import LogoSrc from '../../../assets/images/logo.png';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Link to='/'>
                <div>
                    <img src={LogoSrc} alt='Logo' />
                </div>
            </Link>
        </header>
    );
};

export default Header;