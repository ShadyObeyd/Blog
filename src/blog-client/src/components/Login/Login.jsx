import React from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

function Login() {
    function buttonClicked(event) {
        event.preventDefault();
        console.log('Click from Login');
    }

    return (
        <div className={styles.login}>
            <form>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" placeholder="Email..." />
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" placeholder="Password..." />
                <br />
                <Button clicked={buttonClicked} text="Login"/>
            </form>
            <p>Don't have an account ? Click <Link to="/register">here</Link> to register.</p>
        </div>
    );
}

export default Login;