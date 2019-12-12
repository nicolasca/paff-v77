import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from '../Auth/Auth';
import Logout from '../Auth/Logout/Logout';
import SignIn from '../Auth/SignIn';
import DeckBuilder from '../Decks/DeckBuilder/DeckBuilder';
import DeckList from '../Decks/DeckList/DeckList';
import Factions from '../Factions/Factions';
import Home from '../Home/Home';
import LobbyView from '../Lobby/Lobby';
import Header from './Header/Header';
import styles from './Layout.module.css';

export const UserContext = React.createContext(false);

interface LayoutProps {
  isAuthenticated: boolean;
  username: string;
}

const Layout: FunctionComponent<LayoutProps> = (props) => {

  let content = (
    <React.Fragment>
      <Route path="/home" component={Home} />
      <Route path="/" exact component={Home} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/liste-decks" exact component={DeckList} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/creer-deck" exact component={DeckBuilder} />
      <Route path="/factions" exact component={Factions} />
      <Route render={() => <Redirect to="/" />} />
    </React.Fragment>

  );

  if (props.isAuthenticated) {

    content = (
      <React.Fragment>
        <Route path="/home" component={Home} />
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/creer-deck" exact component={DeckBuilder} />
        <Route path="/factions" exact component={Factions} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/deck" exact component={DeckBuilder} />
        <Route path="/liste-decks" exact component={DeckList} />
        <Route path="/jouer" exact component={LobbyView} />
        {/* <Route render={() => <Redirect to="/" />} /> */}
      </React.Fragment>
    );
  }

  return (
    <div className={styles.Site}>
      <UserContext.Provider value={props.isAuthenticated}>
        <Header
          username={props.username}
          isAuthenticated={props.isAuthenticated}></Header>
        <main className={styles.Main}>
          <Switch>
            {content}
          </Switch>
        </main>
      </UserContext.Provider>

    </div>
  );
}


const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.authReducer.token !== null,
    username: state.authReducer.username,
  }
}

export default connect(mapStateToProps)(Layout);
