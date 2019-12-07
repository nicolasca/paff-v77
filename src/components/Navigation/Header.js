import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

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
          exact to="/liste-decks"
          activeClassName={styles.ActiveNavLink}>
          Mes decks
        </NavLink></li>
        <li><NavLink
          exact to="/creer-deck"
          activeClassName={styles.ActiveNavLink}>
          Créer un deck
        </NavLink></li>
        <li><NavLink
          to="/factions"
          activeClassName={styles.ActiveNavLink}>
          Factions
        </NavLink></li>
        <li><NavLink
          to="/jouer"
          activeClassName={styles.ActiveNavLink}>
          Jouer
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