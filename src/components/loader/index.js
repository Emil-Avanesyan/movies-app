import React from 'react';
import './style.scss';

const Loader = () => {
    return (
        <div className='loading_block'>
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>

    );
};

export default Loader;
