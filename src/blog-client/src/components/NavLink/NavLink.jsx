import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavLink.module.css';

function NavLink({ text, clicked }) {
    return (
        <Link className={styles.link} to="#" onClick={() => clicked(text)}>{text}</Link>
    );
}

export default NavLink;