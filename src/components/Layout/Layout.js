import React from 'react';
import DeckBuilder from '../DeckBuilder/DeckBuilder';
import { Route } from 'react-router-dom';
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

function Layout(props) {

  return (
    <div className={styles.Site}>
      <Header className={styles.Header}></Header>
      <main className={styles.Main}>
        <Route path="/home" component={Home} />
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/deck" exact component={DeckBuilder} />
        <Route path="/factions" exact component={Factions} />
        <Route path="/factions/peaux-vertes" exact component={FactionPeauxVertes} />
        <Route path="/factions/sephosi" exact component={FactionSephosi} />
        <Route path="/factions/gaeli" exact component={FactionGaeli} />
        <Route path="/factions/liches" exact component={FactionLiches} />
      </main>
    </div>
  );
}

export default Layout;