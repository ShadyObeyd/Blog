const { baseUrl } = require("../constants");

const usersUrl = baseUrl + '/users';

export async function register(email, password, repeatPassword) {
    let promise = await fetch(usersUrl + '/register');
    let res = await promise.json();

    return res;
}