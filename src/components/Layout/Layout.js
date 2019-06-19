import React from 'react';
import DeckBuilder from '../DeckBuilder/DeckBuilder';
import Header from '../Navigation/Header';

function Layout(props) {

  return (
    <React.Fragment>
      <Header ></Header>
      <main>
        <DeckBuilder></DeckBuilder>
      </main>
    </React.Fragment>
  );
}

export default Layout;