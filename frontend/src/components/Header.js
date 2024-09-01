import React from 'react';
import './Header.css';

import SearchIcon from '@material-ui/icons/Search';

function Header() {
    return (
        <div className="header">
            {/*  Splitting header into 3 components */}

            <div className='header__center'>
                <div className="header__input">
                    <div>
                        <SearchIcon style={{ fontSize: '24px', color: '#ffffff' }} />
                    </div>
                    <input placeholder="Search" type="text" />
                </div>
            </div>
        </div>
    );
}

export default Header;
