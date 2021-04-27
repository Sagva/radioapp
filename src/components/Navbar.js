import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from '../styles/Navbar.module.css'
import Logo from '../images/radioLogo1.svg';


function Navbar () {
    return (
        <div className={`${styles.navbar} container d-flex align-items-center justify-content-between`}>
            <div className={styles.brandBox}>
                <img className={styles.brandLogo} src={Logo} alt="Logo"/>
            </div>
            <ul>
                <li><NavLink to='/' className={styles.navItem} >Kanaler</NavLink></li>
                <li><NavLink to='/login' className={styles.btnAuthorisation}>Logga in</NavLink></li>
                <li><NavLink to='/register' className={styles.btnAuthorisation}>Bli medlem</NavLink></li>
                {/* <NavLink to='#'>Signin</NavLink> */}
            </ul>
        </div>
    )
}
export default Navbar