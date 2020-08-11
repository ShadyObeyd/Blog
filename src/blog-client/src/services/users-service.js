import { emailPattern, passwordMinLength, invalidEmailMessage, invalidPasswordMessage, invalidRePasswordMessage, baseUrl } from '../constants';

const usersUrl = baseUrl + '/users';

export async function register(email, password, repeatPassword, setFormIsValid, setErrorMessage, props, userContext) {
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

    let promise = await fetch(usersUrl + '/register', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            repeatPassword: repeatPassword
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let res = await promise.json();

    if (res) {
        if (res.message) {
            setFormIsValid(false);
            setErrorMessage(res.message);
        }
        else {
            let token = res.token;
            document.cookie = `x-auth-token=${token}`;
            saveUserInContext(res, userContext);
            props.history.push('/');
        }
    }
}

export async function login(email, password, setFormIsValid, setErrorMessage, userContext) {
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

    let promise = await fetch(usersUrl + '/login', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let res = await promise.json();

    if (res) {
        if (res.message) {
            setFormIsValid(false);
            setErrorMessage(res.message);
        }
        else {
            let token = res.token;
            document.cookie = `x-auth-token=${token}`;
            saveUserInContext(res, userContext);
        }
    }
}

export function logout(userContext) {
    document.cookie = 'x-auth-token=';
    userContext.logout();
}

export async function getTokenDetails() {
    let token = getCookie('x-auth-token');

    if (!token) {
        return;
    }

    let promise = await fetch(usersUrl + '/decode', {
        method: 'POST',
        body: JSON.stringify({
            token
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let res = await promise.json();

    console.log(res);
}

function getCookie(name) {
    let cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return cookieValue ? cookieValue[2] : null;
}

function saveUserInContext(res, userContext) {
    let user = {
        id: res.id,
        email: res.email
    };

    userContext.login(user);
}