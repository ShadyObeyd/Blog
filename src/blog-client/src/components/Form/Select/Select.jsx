import React from 'react';
import Option from '../Option/Option';
import styles from './Select.module.css';

function Select({ options, changed }) {
    return (
    <select className={styles.select} onChange={changed}>
        <Option value='' text='Select a category...' />
        {options.map((o, index) => <Option value={o} text={o} key={index}/>)}
    </select>
    );
}

export default Select;