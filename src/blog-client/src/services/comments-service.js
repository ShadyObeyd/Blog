import { getCookie } from "./users-service";
import { noUserMessage, invalidCommentMessage, commentMaxChars, commentTooLargeMessage } from '../constants';

const { baseUrl, commentContentMinLength } = require("../constants");

const commentsUrl = baseUrl + '/comments';

export async function getCommentsByPostId(postId) {
    let promise = await fetch(commentsUrl + '/all', {
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

export async function createComment(userId, postId, content, setErrorMessage, setFormIsValid) {
    if (!userId) {
        setErrorMessage(noUserMessage);
        setFormIsValid(false);
        return;
    }

    if (postId === 0) {
        
    }

    if (content.length < commentContentMinLength) {
        setErrorMessage(invalidCommentMessage);
        setFormIsValid(false);
        return;
    }

    if (content.length > commentMaxChars) {
        setErrorMessage(commentTooLargeMessage);
        setFormIsValid(false);
        return;
    }

    let token = getCookie('x-auth-token');

    let promise = await fetch(commentsUrl + '/create', {
        method: 'POST',
        body: JSON.stringify({
            userId,
            postId,
            content
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    try {
        let res = await promise.json();

    if (res) {
        if (res.message) {
            setErrorMessage(res.message);
            setFormIsValid(false);
        }
    }
    } catch (e) {
        
    }
}