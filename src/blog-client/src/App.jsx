import React from 'react';
import styles from './App.module.css';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className={styles.App}>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Footer />
    </div>
  );
}

export default App;