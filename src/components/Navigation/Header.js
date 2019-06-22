import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logo from './../../assets/logo.jpg'

function Header() {

  return (
    <header className={styles.Header}>
      <div className={styles.Logo}>
        <img src={logo} alt="logo" />
      </div>
      <ul>
        <li><NavLink
          exact to="/"
          activeClassName={styles.ActiveNavLink}>
          Home
        </NavLink></li>
        <li><NavLink
          exact to="/deckbuilder"
          activeClassName={styles.ActiveNavLink}>
          Deck
        </NavLink></li>
      </ul>
    </header>


  );
}

export default Header; 