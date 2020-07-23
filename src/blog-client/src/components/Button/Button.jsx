import React from 'react';
import styles from './Button.module.css';

function Button({ text, clicked }) {
    return (
        <button onClick={clicked} className={styles.button}>{text}</button>
    );
}

export default Button;