import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavLink.module.css';

function NavLink({ text }) {
    return (
        <Link className={styles.link} to="#">{text}</Link>
    );
}

export default NavLink;