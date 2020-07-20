import React from 'react';
import styles from './App.module.css';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className={styles.App}>
      <h1>Welcome, blogger!</h1>
      <hr />
      <Footer />
    </div>
  );
}

export default App;