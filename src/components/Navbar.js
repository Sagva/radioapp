import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from '../styles/Navbar.module.css'
import Logo from '../images/radioLogo1.svg';
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Navbar () {
    const { setIsLoggedIn, isLoggedIn, logout, } = useContext(UserContext);
    
    const handkeLogoutClick = () => {
        console.log('Logout was clicked')
        logout()
        setIsLoggedIn(false)
    }

    
    return (
        <div className={`${styles.navbar} container d-flex align-items-center justify-content-between my-2`}>
            <div className={styles.brandBox}>
                <img className={styles.brandLogo} src={Logo} alt="Logo"/>
            </div>
            <ul>
                
                    <li><NavLink exact to='/' className={styles.navItem} activeStyle={{color: '#BBE42A', textDecoration: 'none'}} >Kanaler</NavLink></li>

                { isLoggedIn && 
                    <div className='d-flex '>
                        <li><NavLink exact  to='/favorites' className={styles.navItem} activeStyle={{color: '#BBE42A', textDecoration: 'none'}}> Favoriter </NavLink></li>
                        <li><NavLink to='/' className={styles.navItem}  onClick={handkeLogoutClick}>Logout</NavLink></li>
                    </div>
                }

                {
                    !isLoggedIn &&
                        <div className='d-flex flex-column flex-sm-row'>
                            <li><NavLink to='/login' className={styles.btnAuthorisation}>Logga in</NavLink></li>
                            <li><NavLink to='/register' className={styles.btnAuthorisation}>Bli medlem</NavLink></li>
                        </div>
                    
                }
                
            </ul>
        </div>
    )
}
export default Navbar