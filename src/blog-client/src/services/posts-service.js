import { baseUrl, invalidTitleMessage, contentMinLength, invalidContentMessage, invalidCategoryMessage } from "../constants";
import { getCookie } from './users-service';

const postsUrl = baseUrl + '/posts';

export async function fetchCategories() {
    let promise = await fetch(postsUrl + '/categories');
    let res = await promise.json();

    return res;
}

export async function createPost(title, content, category, authorId, setFormIsValid, setErrorMessage) {
    if (title === '' || title === null) {
        setErrorMessage(invalidTitleMessage);
        setFormIsValid(false);
        return;
    }

    if (content.length < contentMinLength) {
        setErrorMessage(invalidContentMessage);
        setFormIsValid(false);
        return;
    }

    if (category === '' || category === null) {
        setErrorMessage(invalidCategoryMessage);
        setFormIsValid(false);
        return;
    }

    let token = getCookie('x-auth-token');

    let promise = await fetch(postsUrl + '/create', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content,
            category,
            authorId
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    var res = await promise.json();
    console.log(res);
    // TODO Redirect to details page
}