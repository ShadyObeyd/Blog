import React from 'react';
import styles from './PostCard.module.css';

function PostCard({ id, title, partialContent }) {
    return (
        <div className={styles.card}>
            <h4><b>{title}</b></h4>
            <p>{partialContent}</p>
        </div>
    );
}

export default PostCard;