import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Login from '../Login/Login';
import styles from './Home.module.css';
import { useContext } from 'react';
import UserContext from '../../context';
import Navbar from '../Navbar/Navbar';
import PostContext from '../../posts-context';
import { useEffect } from 'react';
import { getPosts } from '../../services/posts-service';
import { useState } from 'react';
import Posts from '../Posts/Posts';
import Pagination from '../Pagination/Pagination';
import Spinner from '../Spinner/Spinner';

function Home(props) {
    const userContext = useContext(UserContext);
    const [posts, setPosts] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        let subscribed = true;

        if (subscribed) {
            allPosts();
        }

        return () => {
            subscribed = false;
        }
    }, []);

    async function allPosts() {
        let posts = await getPosts();
        setPosts(posts);
    }

    if (posts === null) {
        return <Spinner />
    }

    const postsPerPage = 6
    const indexOfLastPost = currentPage * postsPerPage;
    const indexofFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexofFirstPost, indexOfLastPost);

    function paginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <PostContext.Provider value={{ posts, getPosts: setPosts }}>
            {userContext.loggedIn ?
                <h1 className={styles['text-center']}>Welcome, {userContext.user.email}!</h1> :
                <h1 className={styles['text-center']}>Welcome, blogger!</h1>}
            <hr />
            <Sidebar />
            {userContext.loggedIn ? <Navbar /> : <Login />}
            <Posts posts={currentPosts} push={props.history.push} />
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} clicked={paginate} />
        </PostContext.Provider>
    );
}

export default Home;