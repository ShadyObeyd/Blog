import React from 'react';
import styles from './TextArea.module.css';

function TextArea({ changed }) {
    return <textarea className={styles.text} onChange={changed}/>
}

export default TextArea;