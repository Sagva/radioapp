import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from '../styles/Navbar.module.css'
import Logo from '../images/radioLogo1.svg';

function Navbar () {
    return (
        <div className={styles.navbar}>
            <div className={styles.brandBox}>
                <img className={styles.brandLogo} src={Logo} alt="Logo"/>
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