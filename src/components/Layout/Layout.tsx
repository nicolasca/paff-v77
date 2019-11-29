import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from '../Auth/Auth';
import Logout from '../Auth/Logout/Logout';
import SignIn from '../Auth/SignIn';
import DeckBuilder from '../Decks/DeckBuilder/DeckBuilder';
import DeckList from '../Decks/DeckList/DeckList';
import FactionGaeli from '../Factions/Faction/FactionGaeli';
import FactionLiches from '../Factions/Faction/FactionLiches';
import FactionPeauxVertes from '../Factions/Faction/FactionPeauxVertes';
import FactionSephosi from '../Factions/Faction/FactionSephosi';
import Factions from '../Factions/Factions';
import Home from '../Home/Home';
import Header from '../Navigation/Header';
import styles from './Layout.module.css';

interface LayoutProps {
  isAuthenticated: boolean;
  username: string;
}

const Layout: React.SFC<LayoutProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {

  let content;

  if (props.isAuthenticated) {
    content = (
      <React.Fragment>
        <Header
          className={styles.Header}
          username={props.username}
          isAuthenticated={props.isAuthenticated}></Header>
        <main className={styles.Main}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/" exact component={Home} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/deck" exact component={DeckBuilder} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/liste-decks" exact component={DeckList} />
          <Route path="/creer-deck" exact component={DeckBuilder} />
          <Route path="/factions" exact component={Factions} />
          <Route path="/factions/peaux-vertes" exact component={FactionPeauxVertes} />
          <Route path="/factions/sephosi" exact component={FactionSephosi} />
          <Route path="/factions/gaeli" exact component={FactionGaeli} />
          <Route path="/factions/liches" exact component={FactionLiches} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>

        </main>
      </React.Fragment>
    );
  } else {
    content = (
    <main className={styles.Main}>
    <Route path="/auth" exact component={Auth} />
    <Route path="/signin" exact component={SignIn} />
    <Redirect to="/auth"></Redirect>
  </main>

    )
  }

  return (
    <div className={styles.Site}>
      {content}
    </div>
  );
}


const mapStateToProps = (state:any) => {
  return {
    isAuthenticated: state.authReducer.token !== null,
    username: state.authReducer.username,
  }
}

export default connect(mapStateToProps)(Layout);
