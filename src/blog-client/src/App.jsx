import React from 'react';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import CreatePost from './components/CreatePost/CreatePost';
import Register from './components/Register/Register';
import { Route, Redirect } from 'react-router-dom';
import UserContext from './context';
import { useState } from 'react';
import { useEffect } from 'react';
import { getTokenDetails } from './services/users-service';
import Spinner from './components/Spinner/Spinner';
import Post from './components/Post/Post';
import Comments from './components/Comments/Comments';

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      getTokenDetails(login, logout);
    }

    return () => {
      subscribed = false;
    }
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
      <Spinner />
    )
  }

  return (
    <UserContext.Provider value={{ user: user, loggedIn: loggedIn, login: login, logout: logout }}>
      <Route exact path="/" component={Home} />
      {loggedIn ? <Redirect to="/" /> : <Route exact path="/register" component={Register} />}
      {loggedIn ? <Route exact path="/create-post" component={CreatePost} /> : <Redirect to='/' />}
      <Route exact path="/post/:id" component={Post} />
      <Route exact path="/comments/:id" component={Comments} />
      <Footer />
    </UserContext.Provider>
  );
}

export default App;