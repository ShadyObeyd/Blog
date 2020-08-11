import React from 'react';
import TopLink from '../TopLink/TopLink';
import styles from './Navbar.module.css';
import { logout } from '../../services/users-service';
import { useContext } from 'react';
import UserContext from '../../context';

function Navbar() {
    const userContext = useContext(UserContext);

    function getCurrentUserPosts() {

    }
    
    function logOut() {
        logout(userContext);
    }

    return (
        <div className={styles.navlink}>
            <TopLink text="My Posts" clicked={getCurrentUserPosts} />
            <TopLink text="Logout" clicked={logOut} />
        </div>
    )
}

export default Navbar;