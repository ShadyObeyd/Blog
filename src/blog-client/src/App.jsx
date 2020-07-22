import React, { Fragment } from 'react';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import { Route } from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Footer />
    </Fragment>
  );
}

export default App;