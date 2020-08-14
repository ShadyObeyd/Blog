import React from 'react';
import styles from './Pagination.module.css';

function Pagination({ postsPerPage, totalPosts, clicked }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    
    return (
        <ul className={styles.pagination}>
            {pageNumbers.map(page =>
                <li key={page} onClick={() => clicked(page)}>{page}</li>
            )}
        </ul>
    );
}

export default Pagination;