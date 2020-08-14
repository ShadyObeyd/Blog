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

function Home() {
    const userContext = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    

    useEffect(() => {
        allPosts();
    }, []);

    async function allPosts() {
        let posts = await getPosts();
        setPosts(posts);
    }
    
    const postsPerPage = 6
    const indexOfLastPost = currentPage * postsPerPage;
    const indexofFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexofFirstPost, indexOfLastPost);

    function paginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <PostContext.Provider value={posts}>
            {userContext.loggedIn ?
                <h1 className={styles['text-center']}>Welcome, {userContext.user.email}!</h1> :
                <h1 className={styles['text-center']}>Welcome, blogger!</h1>}
            <hr />
            <Sidebar />
            {userContext.loggedIn ? <Navbar /> : <Login />}
            <Posts posts={currentPosts} />
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} clicked={paginate}/>
        </PostContext.Provider>
    );
}

export default Home;