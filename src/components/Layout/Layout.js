import React from 'react';
import DeckBuilder from '../DeckBuilder/DeckBuilder';

function Layout(props) {

  return (
    <React.Fragment>
      <div>
        Toolbar, Sidemenu
      </div>
      <main>
        <DeckBuilder></DeckBuilder>
      </main>
    </React.Fragment>
  );
}

export default Layout;