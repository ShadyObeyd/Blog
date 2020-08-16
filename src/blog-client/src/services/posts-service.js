import { baseUrl, invalidTitleMessage, contentMinLength, invalidContentMessage, invalidCategoryMessage, postNotFoundMessage } from "../constants";
import { getCookie } from './users-service';

const postsUrl = baseUrl + '/posts';

export async function fetchCategories() {
    let promise = await fetch(postsUrl + '/categories');
    let res = await promise.json();

    return res;
}

export async function createPost(title, content, category, authorId, setFormIsValid, setErrorMessage, props) {
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

    if (!res) {
        return;
    }

    if (res.message) {
        setErrorMessage(res.message);
        setFormIsValid(false);
        return;
    }

    props.history.push(`/post/${res.id}`);
}

export async function getPosts() {
    let promise = await fetch(postsUrl + '/all');
    let res = await promise.json();

    if (res.message) {
        return;
    }

    return res;
}

export async function getPostsByCategory(category) {
    let promise = await fetch(postsUrl + '/sort', {
        method: 'POST',
        body: JSON.stringify({
            category
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let res = await promise.json();

    return res;
}

export async function getCurrentUserPosts(userId) {
    let token = getCookie('x-auth-token');

    let promise = await fetch(postsUrl + '/current', {
        method: 'POST',
        body: JSON.stringify({
            id: userId
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    let res = await promise.json();

    return res;
}

export async function getPostById(postId) {
    let promise = await fetch(postsUrl + '/post', {
        method: 'POST',
        body: JSON.stringify({
            postId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let res = await promise.json();
    return res;
}

export async function editPost(postId, title, content, category, setErrorMessage, setFormIsValid, props) {
    if (postId === 0) {
        setErrorMessage(postNotFoundMessage);
        setFormIsValid(false);
    }

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

    let promise = await fetch(postsUrl + '/edit', {
        method: 'POST',
        body: JSON.stringify({
            postId,
            title,
            content,
            category
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    let res = await promise.json();

    if (res.message) {
        setErrorMessage(res.message);
        setFormIsValid(false);
        return;
    }

    props.history.push(`/post/${res.id}`);
}