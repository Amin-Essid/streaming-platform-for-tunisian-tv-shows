import React from 'react';
import menuIcon from '../images/icons/menu-icon.png';

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-items flex-component">
                <div className="navbar-items__logo">
                    <img src="" alt=""/>
                </div>
                <input type="text" className="navbar-items__search" placeholder="بحث"/>
                <div className="navbar-items__icon">
                    <img src={menuIcon} alt="menu"/>
                </div>
            </div>
        </div>
    )
}
