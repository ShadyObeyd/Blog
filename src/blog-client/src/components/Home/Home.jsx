import React, { Fragment } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Login from '../Login/Login';

function Home() {
    return (
        <Fragment>
            <h1>Welcome, blogger!</h1>
            <hr />
            <Sidebar />
            <Login />
        </Fragment>
    );
}

export default Home;