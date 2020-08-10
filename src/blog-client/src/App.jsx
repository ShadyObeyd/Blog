import React from 'react';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import { Route } from 'react-router-dom';
import UserContext from './context';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

   const login = (user) => {
    setUser(user);
    setLoggedIn(true);
  }

  const logout = () => {
    setUser(null);
    setLoggedIn(false);
  }

  return (
    <UserContext.Provider value={{user: user, loggedIn: loggedIn, login: login, logout: logout}}>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Footer />
    </UserContext.Provider>
  );
}

export default App;