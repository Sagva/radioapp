import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../styles/Navbar.module.css'
import Logo from '../images/radioLogo1.svg';
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Dropdown from 'react-bootstrap/Dropdown'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    const { setIsLoggedIn, isLoggedIn, logout, } = useContext(UserContext);

    const handkeLogoutClick = () => {
        console.log('Logout was clicked')
        logout()
        setIsLoggedIn(false)
    }
    return (
        <div className={`${styles.navbar} container d-flex align-items-center justify-content-between my-2`}>
            <div className={styles.brandBox}>
                <img className={styles.brandLogo} src={Logo} alt="Logo" />
            </div>
            <ul className='d-flex mb-0 list-unstyled'>

                <li><NavLink exact to='/' className={styles.navItem} activeStyle={{ color: '#BBE42A', textDecoration: 'none' }} >Kanaler</NavLink></li>

                {isLoggedIn === 'unknown' &&
                    <div >
                        {/* Displays nothing until 'isLoggedIn' doesn't get its value (either true or false). 'Unknown' is the original state of 'isLoggedIn'. It allows to prevent of appearance of links for not logged in users at the navbar, when the user is already logged in.  */}
                    </div>
                }
                {isLoggedIn &&
                    <div >
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className={styles.navDropDownBtn}>
                                <FontAwesomeIcon icon={faUser} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/favorites" className={`${styles.navItem} dropdown-item`}>Favoriter</Dropdown.Item>
                                <Dropdown.Item href="/user-page" className={`${styles.navItem} dropdown-item`}>Min sida</Dropdown.Item>
                                <Dropdown.Item href="/" className={`${styles.navItem} dropdown-item`} onClick={handkeLogoutClick}>Logga ut</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
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