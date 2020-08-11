import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TopLink.module.css'

function TopLink({ text, clicked }) {
    return <Link className={styles.link} to="#" onClick={clicked}>{text}</Link>
}

export default TopLink;