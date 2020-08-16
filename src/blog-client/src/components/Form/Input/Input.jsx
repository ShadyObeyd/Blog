import React from 'react';
import styles from './Input.module.css';

function Input({ id, type, changed, placeholder, value }) {
    return <input className={styles.input} id={id} type={type} onChange={changed} placeholder={placeholder} value={value} />
}

export default Input;