import React from 'react';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import { Route, Redirect } from 'react-router-dom';
import UserContext from './context';
import { useState } from 'react';
import { useEffect } from 'react';
import { getTokenDetails } from './services/users-service';
import Loading from './components/Loading/Loading';

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    getTokenDetails(login);
  }, []);

   const login = (user) => {
    setUser(user);
    setLoggedIn(true);
  }

  const logout = () => {
    setUser(null);
    setLoggedIn(false);
  }

  if (loggedIn == null) {
    return (
      <Loading />
    )
  }

  return (
    <UserContext.Provider value={{user: user, loggedIn: loggedIn, login: login, logout: logout}}>
      <Route exact path="/" component={Home} />
      {loggedIn ? <Redirect to="/" /> : <Route exact path="/register" component={Register} />}
      <Footer />
    </UserContext.Provider>
  );
}

export default App;