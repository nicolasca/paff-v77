import React from 'react';
import styles from './Home.module.css';
import logo from '../../assets/logo.jpg';


function Home() {


  return (
    <div className={styles.MainPage}>
      <h1>PAFF v77</h1>
      <img src={logo} alt="" />
    </div>
  );
}

export default Home;