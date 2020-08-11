import React, { Fragment } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Login from '../Login/Login';
import styles from './Home.module.css';
import { useContext } from 'react';
import UserContext from '../../context';
import Navbar from '../Navbar/Navbar';

function Home() {
    const userContext = useContext(UserContext);

    return (
        <Fragment>
            {userContext.loggedIn ?
                <h1 className={styles['text-center']}>Welcome, {userContext.user.email}!</h1> :
                <h1 className={styles['text-center']}>Welcome, blogger!</h1>}
            <hr />
            <Sidebar />
            {userContext.loggedIn ? <Navbar /> : <Login />}
        </Fragment>
    );
}

export default Home;