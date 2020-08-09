import { emailPattern, passwordMinLength, invalidEmailMessage, invalidPasswordMessage, invalidRePasswordMessage, baseUrl } from '../constants';

export function register(email, password, repeatPassword, setFormIsValid, setErrorMessage) {
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

    fetch(baseUrl + '/users/register', {
        method: 'POST',
        body: JSON.stringify({
            email : email,
            password: password,
            repeatPassword: repeatPassword
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(promise => promise.json())
    .then(res => {
        if (res.message) {
            setFormIsValid(false);
            setErrorMessage(res.message);
        } else {
            let token = res.token;
            document.cookie = `x-auth-token=${token}`;
        }
    });
}