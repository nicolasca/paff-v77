import React from 'react';
import { connect } from 'react-redux';
import DeckBuilder from '../DeckBuilder/DeckBuilder';
import { Route, Redirect } from 'react-router-dom';
import styles from './Layout.module.css';
import Home from '../Home/Home';
import Header from '../Navigation/Header';
import Factions from '../Factions/Factions';
import FactionPeauxVertes from '../Factions/Faction/FactionPeauxVertes';
import FactionSephosi from '../Factions/Faction/FactionSephosi';
import FactionGaeli from '../Factions/Faction/FactionGaeli';
import FactionLiches from '../Factions/Faction/FactionLiches';
import Auth from '../Auth/Auth';
import SignIn from '../Auth/SignIn';
import Logout from '../Auth/Logout/Logout';
import DeckList from '../DeckList/DeckList';

function Layout(props) {

  let content = (
    <main className={styles.Main}>
      <Route path="/auth" exact component={Auth} />
      <Route path="/signin" exact component={SignIn} />
      <Redirect to="/auth"></Redirect>
    </main>
  );

  if (props.isAuthenticated) {
    content = (
      <React.Fragment>
        <Header
          className={styles.Header}
          username={props.username}
          isAuthenticated={props.isAuthenticated}></Header>
        <main className={styles.Main}>
          <Route path="/home" component={Home} />
          <Route path="/" exact component={Home} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/deck" exact component={DeckBuilder} />
          <Route path="/liste-decks" exact component={DeckList} />
          <Route path="/factions" exact component={Factions} />
          <Route path="/factions/peaux-vertes" exact component={FactionPeauxVertes} />
          <Route path="/factions/sephosi" exact component={FactionSephosi} />
          <Route path="/factions/gaeli" exact component={FactionGaeli} />
          <Route path="/factions/liches" exact component={FactionLiches} />
          <Redirect to="/deck"></Redirect>

        </main>
      </React.Fragment>
    );
  }



  return (
    <div className={styles.Site}>
      {content}
    </div>
  );
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null,
    username: state.authReducer.username,
  }
}

export default connect(mapStateToProps)(Layout);