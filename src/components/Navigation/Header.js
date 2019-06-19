import React from 'react';
import styles from './Header.module.css';
import logo from './../../assets/logo.jpg'

function Header() {

  return (
    <header className={styles.Header}>
      <div className={styles.Logo}><img src={logo} alt="logo"/></div>
    </header>
  );
}

export default Header; 