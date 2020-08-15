import React from 'react';
import styles from './AddComment.module.css';
import Button from '../Button/Button';
import { useState } from 'react';
import Error from '../Error/Error';
import { createComment } from '../../services/comments-service';

function AddComment({ userId, postId }) {
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formIsValid, setFormIsValid] = useState(true);

    function handleContentChange(e) {
        setContent(e.target.value);
    }

    async function handleClick(e) {
        e.preventDefault();
        await createComment(userId, postId, content, setErrorMessage, setFormIsValid);
        setContent('');
    }

    if (!formIsValid) {
        setTimeout(() => {
            setFormIsValid(true);
        }, 4000);
    }

    return (
        <div className={styles['comment-form']}>
            {!formIsValid ? <Error errorMessage={errorMessage} /> : null}
            <form>
                <label htmlFor='comment'>Comment</label>
                <br />
                <textarea id='comment' onChange={handleContentChange} value={content} />
                <br />
                <Button text='Add Comment' clicked={handleClick} />
            </form>
            <hr />
        </div>
    )
}

export default AddComment;