import React from 'react';
import TopLink from '../TopLink/TopLink';
import styles from './Navbar.module.css';
import { logout } from '../../services/users-service';
import { useContext } from 'react';
import UserContext from '../../context';
import { Link } from 'react-router-dom';
import { getCurrentUserPosts, getPosts } from '../../services/posts-service';
import PostContext from '../../posts-context';
import { useState } from 'react';
import Error from '../Error/Error';
import { userHasNoPostsMessage } from '../../constants';

function Navbar() {
    const userContext = useContext(UserContext);
    const postsContext = useContext(PostContext);
    const [error, setError] = useState(false);

    async function getUserPosts() {
        let userId = userContext.user.id;
        let userPosts = await getCurrentUserPosts(userId);
        
        if (userPosts.length === 0) {
            setError(true);
            return;
        }

        postsContext.getPosts(userPosts);
    }
    
    async function logOut() {
        logout(userContext);
        let posts = await getPosts();
        postsContext.getPosts(posts);
    }

    if (error) {
        setTimeout(() => {
            setError(false);
        }, 4000);
    }

    return (
        <div className={styles.navlink}>
            {error ? <Error errorMessage={userHasNoPostsMessage}/> : null}
            <Link to="/create-post">Create New Post</Link>
            <TopLink text="My Posts" clicked={getUserPosts} />
            <TopLink text="Logout" clicked={logOut} />
        </div>
    )
}

export default Navbar;