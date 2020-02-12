import React from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Layout";
import styles from "./Header.module.scss";

function Header(props) {
  const isAuthenticated = React.useContext(UserContext);

  return (
    <header className={styles.Header}>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName={styles.ActiveNavLink}>
            Home
          </NavLink>
        </li>
        {isAuthenticated ? (
          <li>
            <NavLink
              exact
              to="/liste-decks"
              activeClassName={styles.ActiveNavLink}
            >
              Mes decks
            </NavLink>
          </li>
        ) : null}
        <li>
          <NavLink
            exact
            to="/les-cartes"
            activeClassName={styles.ActiveNavLink}
          >
            Les cartes
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/regles"
            activeClassName={styles.ActiveNavLink}
          >
            Règles
          </NavLink>
        </li>
        <li>
          <NavLink to="/factions" activeClassName={styles.ActiveNavLink}>
            Factions
          </NavLink>
        </li>
        {isAuthenticated ? (
          <li>
            <NavLink to="/jouer" activeClassName={styles.ActiveNavLink}>
              Jouer
            </NavLink>
          </li>
        ) : null}
      </ul>
      <ul>
        {!isAuthenticated ? (
          <li>
            <NavLink exact to="/auth" activeClassName={styles.ActiveNavLink}>
              Connexion
            </NavLink>
          </li>
        ) : (
          <React.Fragment>
            <li>{props.email}</li>
            <li>
              <NavLink exact to="/logout">
                Déconnexion
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </header>
  );
}

export default Header;
