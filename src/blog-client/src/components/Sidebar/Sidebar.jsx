import React, { useState, useEffect } from 'react';
import style from './Sidebar.module.css';
import Category from '../Category/Category';

function Sidebar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchAndSetCategories() {
            let promise = await fetch('https://localhost:44393/api/posts/categories');
            let json = await promise.json();

            setCategories(json);
        }

        fetchAndSetCategories();
    }, []);

    return (
        <div className={style.sidenav}>
            <h3>Categories</h3>
            {categories.map((c, index) => <Category category={c} key={index}/>)}
        </div>
    );
}

export default Sidebar;