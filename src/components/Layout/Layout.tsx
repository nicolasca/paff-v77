import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Auth from "../Auth/Auth";
import Logout from "../Auth/Logout/Logout";
import SignIn from "../Auth/SignIn";
import DeckBuilder from "../Decks/DeckBuilder/DeckBuilder";
import DeckList from "../Decks/DeckList/DeckList";
import TheCards from "../Decks/TheCards/TheCards";
import Factions from "../Factions/Factions";
import Home from "../Home/Home";
import LobbyView from "../Lobby/Lobby";
import Rules from "../Rules/Rules";
import Header from "./Header/Header";
import styles from "./Layout.module.css";

export const UserContext = React.createContext(false);

interface LayoutProps {
  isAuthenticated: boolean;
  email: string;
}

const Layout: FunctionComponent<LayoutProps> = props => {
  let content = (
    <React.Fragment>
      <Route path="/home" component={Home} />
      <Route path="/" exact component={Home} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/regles" exact component={Rules} />
      <Route path="/liste-decks" exact component={DeckList} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/les-cartes" exact component={TheCards} />
      <Route path="/factions" exact component={Factions} />
    </React.Fragment>
  );

  if (props.isAuthenticated) {
    content = (
      <React.Fragment>
        <Route path="/home" component={Home} />
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/regles" exact component={Rules} />
        <Route path="/creer-deck" exact component={DeckBuilder} />
        <Route path="/factions" exact component={Factions} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/deck" exact component={DeckBuilder} />
        <Route path="/liste-decks" exact component={DeckList} />
        <Route path="/jouer" exact component={LobbyView} />
      </React.Fragment>
    );
  }

  return (
    <div className={styles.Site}>
      <UserContext.Provider value={props.isAuthenticated}>
        <Header
          email={props.email}
          isAuthenticated={props.isAuthenticated}
        ></Header>
        <main className={styles.Main}>
          <Switch>{content}</Switch>
        </main>
      </UserContext.Provider>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.authReducer.token !== null,
    email: state.authReducer.email
  };
};

export default connect(mapStateToProps)(Layout);
