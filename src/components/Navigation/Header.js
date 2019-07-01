import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

function Header(props) {

  return (
    <header className={styles.Header}>
      <ul>
        <li><NavLink
          exact to="/"
          activeClassName={styles.ActiveNavLink}>
          Home
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
      <ul>
        {!props.isAuthenticated ?

          <li><NavLink
            exact to="/auth"
            activeClassName={styles.ActiveNavLink}>
            Connexion
        </NavLink></li>
          :
          <React.Fragment>
            <li>{props.username}</li>
            <li><NavLink
              exact to="/logout">
              Déconnexion
        </NavLink></li>
          </React.Fragment>}
      </ul>
    </header>


  );
}

export default Header; 