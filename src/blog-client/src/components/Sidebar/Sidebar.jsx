import React, { useState, useEffect } from 'react';
import style from './Sidebar.module.css';
import NavLink from '../NavLink/NavLink';

function Sidebar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchAndSetCategories();
    }, []);

    async function fetchAndSetCategories() {
        let promise = await fetch('https://localhost:44393/api/posts/categories');
        let res = await promise.json();

        setCategories(res);
    }

    return (
        <div className={style.sidenav}>
            <h3>Categories</h3>
            {categories.map((c, index) => <NavLink text={c} key={index}/>)}
        </div>
    );
}

export default Sidebar;