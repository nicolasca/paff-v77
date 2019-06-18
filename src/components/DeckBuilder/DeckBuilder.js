import React, { Component } from 'react';
import CardList from './CardList/CardList'
import DeckSummary from './DeckSummary/DeckSummary';
import style from "./DeckBuilder.module.css";
import unites from "./../../unites";

class DeckBuilder extends Component {

  state = {
    selectedFaction: 'orcs',
    selectedCards: [],
    cardsToDisplay: []
  }

  componentDidMount() {
    const cards = [];
    unites.forEach((unite) => {
      if (unite.faction === this.state.selectedFaction) {
        cards.push(unite);
      }
    });
    this.setState({cardsToDisplay: cards});
  }

  changeFactionHandler = (event) => {
    this.setState({ selectedFaction : event.target.value});
    const cards = [];
    
    unites.forEach((unite) => {
      if (unite.faction === event.target.value) {
        cards.push(unite);
      }
    });
    this.setState({cardsToDisplay: cards});

  }

  addCardHandler = (name) => {
    const selectedCardsChanged = [...this.state.selectedCards];
    const cardIndex = this.state.selectedCards.findIndex((unite) => {
      return unite.name === name;
    });
    let card = null;
    if (cardIndex !== -1) {
      card = unites[cardIndex];
      card.count += 1; 
    } else {
       card = unites.find((unite) => {
        return unite.name === name;
      });
      card.count = 1;
    }

    selectedCardsChanged.push(card);

    this.setState({selectedCards: selectedCardsChanged});
    
  }

  removeCardHandler = (name) => {
    const selectedCardsChanged = [...this.state.selectedCards];
    const index = unites.findIndex((unite) => {
      return unite.name === name;
    });
    selectedCardsChanged.slice(index, 1);

    this.setState({selectedCards: selectedCardsChanged});
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
              units={this.state.cardsToDisplay}
              faction={this.state.selectedFaction}
              clickedPlus={this.addCardHandler}
              clickedMinus={this.removeCardHandler}
            >
            </CardList>
          </div>
          <DeckSummary cards={this.state.selectedCards}>

          </DeckSummary>
    </div>
      </React.Fragment>
      
      
    );
  }
}

export default DeckBuilder;