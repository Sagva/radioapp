import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from '../styles/Navbar.module.css'

function Navbar () {
    return (
        <div className={styles.navbar}>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/about'>About</NavLink>
        </div>
    )
}
export default Navbar