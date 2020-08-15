import React from 'react';
import PostCard from '../PostCard/PostCard';
import styles from './Posts.module.css';

function Posts({ posts, push}) {
    function handleClick(id) {
        push(`/post/${id}`);
    }

    return (
        <div className={styles.posts}>
            {posts.map(p => <PostCard clicked={handleClick} id={p.id} title={p.title} partialContent={p.partialContent} key={p.id} />)}
        </div>
    );
}

export default Posts;