import React, { useState } from 'react';
import styles from './Register.module.css';
import Button from '../Button/Button';
import Error from '../Error/Error';
import { emailPattern, passwordMinLength, invalidEmailMessage, invalidPasswordMessage, invalidRePasswordMessage } from '../../constants';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [formIsValid, setFormIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleRepeatPasswordChange(event) {
        setRepeatPassword(event.target.value);
    }

    function buttonClicked(event) {
        event.preventDefault();

        if (!email.match(emailPattern)) {
            setFormIsValid(false);
            setErrorMessage(invalidEmailMessage);
            return;
        }

        if (password.length < passwordMinLength) {
            setFormIsValid(false);
            setErrorMessage(invalidPasswordMessage);
            return;
        }

        if (repeatPassword !== password) {
            setFormIsValid(false);
            setErrorMessage(invalidRePasswordMessage);
            return;
        }

        // TODO Make request to back-end
    }

    if (!formIsValid) {
        setTimeout(() => {
            setFormIsValid(true);
        }, 4000);
    }

    return (
        <div className={styles.register}>
            <h1>Register</h1>
            <hr />
            {!formIsValid ? <Error errorMessage={errorMessage} /> : null}
            <form>
                <label htmlFor="email">Email</label>
                <br />
                <input id="email" type="email" onChange={handleEmailChange} placeholder="Email..." />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input id="password" type="password" onChange={handlePasswordChange} placeholder="Password..." />
                <br />
                <label htmlFor="repeat-password">Repeat Password</label>
                <br />
                <input id="repeat-password" type="password" onChange={handleRepeatPasswordChange} placeholder="Repeat Password..." />
                <br />
                <Button clicked={buttonClicked} text="Register" />
            </form>
        </div>
    );
}

export default Register;