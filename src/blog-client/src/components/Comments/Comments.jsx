import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCommentsByPostId } from '../../services/comments-service';
import Spinner from '../Spinner/Spinner';
import styles from './Comments.module.css';
import { useContext } from 'react';
import UserContext from '../../context';
import AddComment from '../AddComment/AddComment';
import Comment from '../Comment/Comment';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';

function Comments(props) {
    const postId = Number(props.match.params.id);
    const [comments, setComments] = useState(null);
    const userContext = useContext(UserContext);
    const [currentPage, setCurrentPage] = useState(1);

    const isLoggedIn = userContext.loggedIn;
    const userId = isLoggedIn ? userContext.user.id : null;

    useEffect(() => {
        let subscribed = true;
        if (subscribed) {
            getPostComments(postId);
        }

        return () => subscribed = false;
    }, [postId, comments]);

    async function getPostComments(postId) {
        let postComments = await getCommentsByPostId(postId);
        setComments(postComments);
    }

    if (comments === null) {
        return <Spinner />
    }

    const commentsPerPage = 2;
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexofFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexofFirstComment, indexOfLastComment);

    function paginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <div className={styles.comments}>
            <div className={styles.container}>
                <Link to='/' className={styles.link}>Back to Home</Link>
            </div>
            {isLoggedIn ? <AddComment userId={userId} postId={postId} /> : null}
            {comments.length === 0 ? <h2>No comments yet!</h2> :
                <ul>
                    {currentComments.map(c => <Comment author={c.authorName} createdOn={c.createdOn} text={c.content} key={c.id} />)}
                </ul>
            }
            <Pagination postsPerPage={commentsPerPage} totalPosts={comments.length} clicked={paginate}/>
        </div>
    )
}

export default Comments;