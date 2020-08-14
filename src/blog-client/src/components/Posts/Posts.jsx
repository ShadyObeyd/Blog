import React from 'react';
import PostCard from '../PostCard/PostCard';
import styles from './Posts.module.css';

function Posts({ posts }) {
    return (
        <div className={styles.posts}>
            {posts.map(p => <PostCard id={p.id} title={p.title} partialContent={p.partialContent} key={p.id} />)}
        </div>
    );
}

export default Posts;