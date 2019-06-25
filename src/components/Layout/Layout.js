import React from 'react';
import DeckBuilder from '../DeckBuilder/DeckBuilder';
import { Route } from 'react-router-dom';
import styles from './Layout.module.css';
import Home from '../Home/Home';
import Header from '../Navigation/Header';
import Factions from '../Factions/Factions';
import Faction from '../Factions/Faction/Faction';

function Layout(props) {

  return (
    <div className={styles.Site}>
      <Header className={styles.Header}></Header>
      <main className={styles.Main}>
        <Route path="/home" component={Home} />
        <Route path="/" exact component={Home} />
        <Route path="/deck" exact component={DeckBuilder} />
        <Route path="/factions" exact component={Factions} />
        <Route path="/factions/:slug" exact component={Faction} />
      </main>
    </div>
  );
}

export default Layout;