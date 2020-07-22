import React from 'react';
import styles from './Login.module.css';

function Login() {
    return (
        <div className={styles.login}>
            <form>
                <label>Email:</label>
                <input placeholder="Email..." />
                <label>Password:</label>
                <input placeholder="Password..." />
                <br />
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;