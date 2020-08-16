import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getPostById } from '../../services/posts-service';
import Spinner from '../Spinner/Spinner';
import styles from './Post.module.css';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../context';

function Post(props) {
    const postId = Number(props.match.params.id);
    const [post, setPost] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const userContext = useContext(UserContext);

    const isLoggedIn = userContext.loggedIn;
    const userId = isLoggedIn ? userContext.user.id : null;

    useEffect(() => {
        let subscribed = true;
        if (subscribed) {
            getPost(postId);
        }

        return () => {
            subscribed = false;
        }
    }, [postId]);

    async function getPost(postId) {
        let post = await getPostById(postId);
        setPost(post);
    }

    if (post === null) {
        return <Spinner />
    }

    const charsPerPage = 1337;
    const indexOfLastChar = currentPage * charsPerPage;
    const indexOfFirstChar = indexOfLastChar - charsPerPage;
    const currentContent = post.content.slice(indexOfFirstChar, indexOfLastChar);

    function paginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <div className={styles.post}>
            <h1>{post.title}</h1>
            <div className={styles.quotes}>
                <blockquote>{post.category}</blockquote>
            </div>
            <hr />
            <p className={styles.content}>{currentContent}</p>
            <Pagination postsPerPage={charsPerPage} totalPosts={post.content.length} clicked={paginate} />
            <div className={styles.quotes}>
                <blockquote>{post.createdOn}</blockquote>
                <blockquote>{post.authorName}</blockquote>
            </div>
            <hr />
            <div className={styles.container}>
                {userId === post.authorId ? <Link to={{ pathname: `/edit/${postId}` }} className={styles.link}>Edit</Link> : null}
                <Link to={{ pathname: `/comments/${postId}` }} className={styles.link}>View Comments ({post.commentsCount})</Link>
            </div>
        </div>
    )
}

export default Post;