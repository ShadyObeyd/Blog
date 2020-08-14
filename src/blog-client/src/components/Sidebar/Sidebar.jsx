import React, { useState, useEffect } from 'react';
import style from './Sidebar.module.css';
import NavLink from '../NavLink/NavLink';
import { fetchCategories } from '../../services/posts-service';

function Sidebar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    async function getCategories() {
        let categories = await fetchCategories();

        setCategories(categories);
    }

    return (
        <div className={style.sidenav}>
            <h3>Categories</h3>
            {categories.map((c, index) => <NavLink text={c} key={index}/>)}
            <NavLink  text="All"/>
        </div>
    );
}

export default Sidebar;