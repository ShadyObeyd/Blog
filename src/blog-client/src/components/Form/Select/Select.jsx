import React from 'react';
import Option from '../Option/Option';
import styles from './Select.module.css';

function Select({ options, changed, value }) {
    return (
    <select className={styles.select} onChange={changed} value={value}>
        <Option value='' text='Select a category...' />
        {options.map((o, index) => <Option value={o} text={o} key={index}/>)}
    </select>
    );
}

export default Select;