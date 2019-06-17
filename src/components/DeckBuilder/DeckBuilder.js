import React, { Component } from 'react';
import CardList from './CardList'
import style from "./DeckBuilder.module.css";

class DeckBuilder extends Component {

  units = [
    {
      "id": 0,
      "name": "Troupe de Gobelins",
      "type": "Troupe",
      "depl": 1,
      "mouv": 1,
      "reg": 10,
      "moral": 5,
      "armor": "I",
      "att_1": 2,
      "att_2": 1,
      "att_3": 0,
      "charge": 1,
      "shoot_1": 0,
      "shoot_2": 0,
      "shoot_3": 0,
      "range": 0
    }
  ];

  render() {
    return (
      <React.Fragment>
        <div>
        <h1>Nouveau deck</h1>
        <label for="deckName">Nom du deck</label>
        <input type="text" placeholder="Les Chevaucheurs de Zarn" id="deckName"></input>
          <button>A la guerre !</button>
        </div>
        <div className={style.deckBuilder}>
        <div className="card-list">
          <CardList units={this.units}></CardList>
        </div>
        <div className="deck-summary">
deck summary
        </div>
    </div>
      </React.Fragment>
      
      
    );
  }
}

export default DeckBuilder;