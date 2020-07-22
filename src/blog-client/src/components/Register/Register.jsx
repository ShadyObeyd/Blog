import React from 'react';
import styles from './Register.module.css';
import Button from '../Button/Button';

function Register() {
    return (
        <div className={styles.register}>
            <h1>Register</h1>
            <hr />
            <form>
                <label>Email</label>
                <br />
                <input type="email" placeholder="Email..."/>
                <br />
                <label>Password</label>
                <br />
                <input type="password" placeholder="Password..." />
                <br />
                <label>Repeat Password</label>
                <br />
                <input type="password" placeholder="Repeat Password..."/>
                <br />
                <Button text="Register"/>
            </form>
        </div>
    );
}

export default Register;