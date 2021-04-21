import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from '../styles/Navbar.module.css'
import Logo from '../images/logo.png';

function Navbar () {
    return (
        <div className={styles.navbar}>
            <div className={styles.brandBox}>
                <img className={styles.brandLogo} src={Logo} alt="Logo"/>
                <span className={styles.brandName}>Radio</span>
            </div>
            <ul>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/about'>About</NavLink>
                {/* <NavLink to='#'>Signin</NavLink> */}
            </ul>
        </div>
    )
}
export default Navbar