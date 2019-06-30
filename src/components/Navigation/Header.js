import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {

  return (
    <header className={styles.Header}>
      <ul>
        <li><NavLink
          exact to="/"
          activeClassName={styles.ActiveNavLink}>
          Home
        </NavLink></li>
        <li><NavLink
          exact to="/auth"
          activeClassName={styles.ActiveNavLink}>
          Connexion
        </NavLink></li>
        <li><NavLink
          exact to="/signin"
          activeClassName={styles.ActiveNavLink}>
          Inscription
        </NavLink></li>
        <li><NavLink
          exact to="/deck"
          activeClassName={styles.ActiveNavLink}>
          Deck
        </NavLink></li>
        <li><NavLink
          to="/factions"
          activeClassName={styles.ActiveNavLink}
        >
          Factions
        </NavLink></li>
      </ul>
    </header>


  );
}

export default Header; 