import React, { Component } from 'react';
import CardList from './CardList/CardList'
import DeckSummary from './DeckSummary/DeckSummary';
import style from "./DeckBuilder.module.css";
import axios from 'axios';

class DeckBuilder extends Component {

  unites = [];
  ordres = [];

  state = {
    selectedFaction: 'orcs',
    cardsToDisplay: {}
  }

  getUnites = () => {
    return axios.get("http://localhost:3002/unites");
  }

  getOrdres = () => {
    return axios.get("http://localhost:3002/ordres");
  }

  componentDidMount() {
    axios.all([this.getUnites(), this.getOrdres()])
    .then(axios.spread((unites, ordres) => {   
      console.log(unites, ordres);
         
      this.unites = unites.data;
      this.ordres = ordres.data;
      this.populateCardToDisplay('orcs');
    }));
  }

  changeFactionHandler = (event) => {
    this.setState({ selectedFaction: event.target.value });

    this.populateCardToDisplay(event.target.value);
  }

  populateCardToDisplay = (faction) => {

    const cards = [];
    // Populate les unites
    this.unites.forEach((unite) => {
      if (unite.faction === faction) {

        // MFaire une copie de l'unite
        cards[unite.name] = {
          ...unite,
          count: 0,
        };
      }
    });


    // Populate les ordres
    this.ordres.forEach((ordre) => {
      if (ordre.faction === faction || ordre.faction === 'commun') {

        // Faire une copie de l'ordre
        cards[ordre.name] = {
          ...ordre,
          count: 0,
        };
      }
    });
    

    this.setState({ cardsToDisplay: cards });
  }

  // Add one card to the deck
  addCardHandler = (name) => {
    // Copy the state object
    const cardsToDisplayChanged = { ...this.state.cardsToDisplay };
    let card = cardsToDisplayChanged[name];

    // Vérifier si le nombre est limité
    if (card.limite && card.count === card.limite) {
      return;
    }

    card.count += 1;

    this.setState({ cardsToDisplay: cardsToDisplayChanged });

  }

  // Remove one card from the deck
  removeCardHandler = (name) => {
    // Copy the state object
    const cardsToDisplayChanged = { ...this.state.cardsToDisplay };

    if (cardsToDisplayChanged[name].count === 0)
      return;

    cardsToDisplayChanged[name].count -= 1;
    this.setState({ cardsToDisplay: cardsToDisplayChanged });
  }

  render() {

    return (
      <React.Fragment>
        <div>
          <h1>Nouveau deck</h1>
          <label htmlFor="deckName">Nom du deck</label>
          <input type="text" placeholder="Les Chevaucheurs de Zarn" id="deckName"></input>
          <button>A la guerre !</button>
        </div>
        <div>
          <select onChange={this.changeFactionHandler} value={this.state.selectedFaction}>
            <option value="orcs">Orcs</option>
            <option value="sephosi">Sephosi</option>
            <option value="gaeli">Gaeli</option>
            <option value="liches">Liches</option>
          </select>
        </div>
        <div className={style.deckBuilder}>
          <div className="card-list">
            <CardList
              cards={this.state.cardsToDisplay}
              faction={this.state.selectedFaction}
              clickedPlus={this.addCardHandler}
              clickedMinus={this.removeCardHandler}
            >
            </CardList>
          </div>
          <div className={style.deckSummary}>
            <DeckSummary cards={this.state.cardsToDisplay}>
            </DeckSummary>
          </div>
        </div>
      </React.Fragment>


    );
  }
}

export default DeckBuilder;