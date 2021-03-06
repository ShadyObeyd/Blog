import React, { useState, useEffect } from 'react';
import style from './Sidebar.module.css';
import NavLink from '../NavLink/NavLink';
import { fetchCategories, getPostsByCategory } from '../../services/posts-service';
import { useContext } from 'react';
import PostContext from '../../posts-context';
import Error from '../Error/Error';
import { noPostsWithCategoryMessage } from '../../constants';
import Spinner from '../Spinner/Spinner';

function Sidebar() {
    const [categories, setCategories] = useState(null);
    const [error, setError] = useState(false);

    const postContext = useContext(PostContext);

    useEffect(() => {
        let subscribed = true;

        if (subscribed) {
            getCategories();
        }

        return () => {
            subscribed = false;
        }
    }, []);

    async function getCategories() {
        let categories = await fetchCategories();

        setCategories(categories);
    }

    if (categories === null) {
        return <Spinner />
    }

    async function handleClick(category) {
        let posts = await getPostsByCategory(category);

        if (posts.length === 0) {
            setError(true);
            return;
        }

        postContext.getPosts(posts);
    }

    if (error) {
        setTimeout(() => {
            setError(false);
        }, 4000);
    }

    return (
        <div className={style.sidenav}>
            <h3>Categories</h3>
            {error ? <Error errorMessage={noPostsWithCategoryMessage} /> : null}
            {categories.map((c, index) => <NavLink text={c} clicked={handleClick} key={index} />)}
            <NavLink text="All" clicked={handleClick} />
        </div>
    );
}

export default Sidebar;