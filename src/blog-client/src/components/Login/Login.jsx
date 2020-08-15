import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Error from '../Error/Error';
import { login } from '../../services/users-service';
import { useContext } from 'react';
import UserContext from '../../context';
import PostContext from '../../posts-context';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formIsValid, setFormIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const userContext = useContext(UserContext);
    const postsContext = useContext(PostContext);

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function buttonClicked(event) {
        event.preventDefault();
        await login(email, password, setFormIsValid, setErrorMessage, userContext, postsContext);
    }

    if (!formIsValid) {
        setTimeout(() => {
            setFormIsValid(true);
        }, 4000);
    }

    return (
        <div className={styles.login}>
            {!formIsValid ? <Error errorMessage={errorMessage} /> : null}
            <form>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" onChange={handleEmailChange} placeholder="Email..." />
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" onChange={handlePasswordChange} placeholder="Password..." />
                <br />
                <Button clicked={buttonClicked} text="Login"/>
            </form>
            <p>Don't have an account ? Click <Link to="/register">here</Link> to register.</p>
        </div>
    );
}

export default Login;