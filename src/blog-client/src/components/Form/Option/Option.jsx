import React from 'react';
import styles from './Option.module.css';

function Option({ value, text }) {
    return <option className={styles.option} value={value}>{text}</option>
}

export default Option;