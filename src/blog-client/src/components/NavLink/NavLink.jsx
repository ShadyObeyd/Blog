import React from 'react';
import { Link } from 'react-router-dom';

function NavLink({ text }) {
    return (
        <Link to="#">{text}</Link>
    );
}

export default NavLink;