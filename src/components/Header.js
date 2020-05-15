import React from 'react';
import NavBar from './Navbar';
import Logo from '../images/icons/newLogo.png';
import MiniLogo from '../images/icons/newMiniLogo.png';
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <div className="header">
            <div className="header-items">
                <Link className='bigLogo' to='/'><img  src={Logo} alt="Logo"/></Link>
                <Link className='miniLogo' to='/'><img src={MiniLogo} alt="Logo"/></Link>
            <NavBar />
            </div>
        </div>
    )
}

