import React, {useState} from 'react';
import menuIcon from '../images/icons/menuIcon.png';
import {Link} from 'react-router-dom';
import FaceBookIcon from '../images/icons/facebook.png';
import EmailIcon from '../images/icons/email.png';
import LinkedinIcon from '../images/icons/linkedin.png'

function Navbar() {
  const [open, setOpen] = useState(false);
    return (
        <nav className="navbar">
            
                <span className='nav-item'>
                  <Link to={() => `/2020${Math.floor(Math.random()*1000)}`} className='nav-item__link'>
                    رمضان 2020
                  </Link>
                </span>
                <span className='nav-item'>
                  <Link to={() => `/كل-الأصناف${Math.floor(Math.random()*1000)}`} className='nav-item__link'>كل المسلسلات </Link>
                </span>
                <span className=' nav-item socialMedia-container'>
                  <a target="_blank" href="https://www.facebook.com/essoiydi.mohamedamin"><img src={FaceBookIcon} alt="" className="socialMedia-icon-fb"/></a>
                  <a target="_blank" href="https://www.facebook.com/essoiydi.mohamedamin"><img src={EmailIcon} alt="" className="socialMedia-icon-em"/></a>
                  <a target="_blank" href="https://www.facebook.com/essoiydi.mohamedamin"><img src={LinkedinIcon} alt="" className="socialMedia-icon-ln"/></a>
                </span>
                <DropdownNavItem content={<img src={menuIcon} alt="menu"/>}>
                    <DropdownMenu></DropdownMenu>
                </DropdownNavItem>
                
            
        </nav>
    )


    function DropdownNavItem(props){
        return (
            <span className='menu-icon'>
              <Link to="#" className="nav-item__link" onClick={() => setOpen(!open)}>
                {props.content}
              </Link>
        
              {open && props.children}
            </span>
          );
    }

    function DropdownMenu(){

        function DropdownItem(props) {
            return (
              <li className="dropdown-item" onClick={() => setOpen(!open)}>
                {props.children}
              </li>
            );
          }

        return (
            <div className='dropdown'>
                <DropdownItem><Link to={() => `/2020${Math.floor(Math.random()*1000)}`}>رمضان 2020</Link></DropdownItem>
                <DropdownItem><Link to={() => `/كل-الأصناف${Math.floor(Math.random()*1000)}`}>
                كل المسلسلات</Link></DropdownItem>
                <DropdownItem className='socialMedia-container'>
                  <a target="_blank" href="https://www.facebook.com/essoiydi.mohamedamin"><img src={FaceBookIcon} alt="" className="socialMedia-icon-fb"/></a>
                  <a target="_blank" href="https://www.facebook.com/essoiydi.mohamedamin"><img src={EmailIcon} alt="" className="socialMedia-icon-em"/></a>
                  <a target="_blank" href="https://www.facebook.com/essoiydi.mohamedamin"><img src={LinkedinIcon} alt="" className="socialMedia-icon-ln"/></a>
                </DropdownItem>
            </div>
        )
    }
}

export default Navbar
