import React from 'react';
import styles from './TextArea.module.css';

function TextArea({ changed, value }) {
    return <textarea className={styles.text} onChange={changed} value={value}/>
}

export default TextArea;