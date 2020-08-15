import React from 'react';
import styles from './Comment.module.css';

function Comment({ text, author, createdOn }) {
    return (
        <div className={styles.comment}>
            <p>{author}</p>
            <li>{text}</li>
            <p>{createdOn}</p>
            <hr />
        </div>
    )
}

export default Comment;