import React from 'react';
import styles from './Label.module.css';

function Label({ forr, text }) {
    return <label className={styles.label} htmlFor={forr}>{text}</label>
}

export default Label;