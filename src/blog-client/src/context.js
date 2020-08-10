import React from 'react';

const UserContext = React.createContext({
    user: null,
    loggedIn: false,
    login: () => {},
    logout: () => {},
});

export default UserContext;