import React from 'react';
import styles from './App.module.css';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './components/Login/Login';

function App() {
  return (
    <div className={styles.App}>
      <h1>Welcome, blogger!</h1>
      <hr />
      <Sidebar />
      <Login />
      <Footer />
    </div>
  );
}

export default App;