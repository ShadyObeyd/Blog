import React, { Fragment } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Login from '../Login/Login';
import styles from './Home.module.css';

function Home() {
    return (
        <Fragment>
            <h1 className={styles['text-center']}>Welcome, blogger!</h1>
            <hr />
            <Sidebar />
            <Login />
        </Fragment>
    );
}

export default Home;