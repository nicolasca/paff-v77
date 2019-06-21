import React from 'react';
import DeckBuilder from '../DeckBuilder/DeckBuilder';
import Auth from '../../containers/Auth/Auth';
import { Route } from 'react-router-dom';
import styles from './Layout.module.css';
import Home from '../Home/Home';
import Header from '../Navigation/Header';

function Layout(props) {

  return (
    <React.Fragment>
      <Header ></Header>
      <main className={styles.Main}>
        <Route path="/home" component={Home} />
        <Route path="/" exact component={Home} />
        <Route path="/deckbuilder" exact component={DeckBuilder}/>
        <Route path="/register" exact component={Auth}/>
      </main>
    </React.Fragment>
  );
}

export default Layout;