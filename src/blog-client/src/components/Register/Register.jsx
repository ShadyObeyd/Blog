import React, { useState } from 'react';
import styles from './Register.module.css';
import Button from '../Button/Button';
import Error from '../Error/Error';
import { register } from '../../services/users-service';
import { useContext } from 'react';
import UserContext from '../../context';
import Input from '../Form/Input/Input';
import Label from '../Form/Label/Label';

function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [formIsValid, setFormIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const userContext = useContext(UserContext);

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleRepeatPasswordChange(event) {
        setRepeatPassword(event.target.value);
    }

    async function buttonClicked(event) {
        event.preventDefault();
        await register(email, password, repeatPassword, setFormIsValid, setErrorMessage, props, userContext);
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
                <Label forr="email" text="Email"/>
                <br />
                <Input id="email" type="email" changed={handleEmailChange} placeholder="Email..." />
                <br />
                <Label forr="password" text="Password" />
                <br />
                <Input id="password" type="password" changed={handlePasswordChange} placeholder="Password..." />
                <br />
                <Label forr="repeat-password" text="Repeat Password"/>
                <br />
                <Input id="repeat-password" type="password" changed={handleRepeatPasswordChange} placeholder="Repeat Password..." />
                <br />
                <Button clicked={buttonClicked} text="Register" />
            </form>
        </div>
    );
}

export default Register;