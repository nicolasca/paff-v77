import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from './../../assets/logo.jpg'

function Header() {

  return (
    <header className={styles.Header}>
      <div className={styles.Logo}>
        <img src={logo} alt="logo"/>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/deckbuilder">Deck</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </header>


  );
}

export default Header; 