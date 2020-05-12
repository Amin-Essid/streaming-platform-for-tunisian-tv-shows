import React from 'react';

import NavBar from './Navbar';

export default function Header() {
    return (
        <div className="header">
            <div className="header-items">
                <div className="header-items__logo">
                    <img src="" alt=""/>
                </div>
                {/* <input type="text" className="header-items__search" placeholder="بحث"/> */}
                <NavBar />
            </div>
        </div>
    )
}

