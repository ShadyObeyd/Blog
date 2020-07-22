import React from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

function Login() {
    return (
        <div className={styles.login}>
            <form>
                <label>Email:</label>
                <input type="email" placeholder="Email..." />
                <label>Password:</label>
                <input type="password" placeholder="Password..." />
                <br />
                <Button text="Login"/>
            </form>
            <p>Don't have an account ? Click <Link to="/register">here</Link> to register.</p>
        </div>
    );
}

export default Login;