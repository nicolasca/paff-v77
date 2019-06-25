import React, { Component } from 'react';
import CardList from './CardList/CardList'
import DeckSummary from './DeckSummary/DeckSummary';
import style from "./DeckBuilder.module.css";
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class DeckBuilder extends Component {

  unites = [];
  ordres = [];

  state = {
    selectedFaction: 'orcs',
  }

  getUnites = () => {
    return axios.get("http://localhost:3001/unites");
  }

  getOrdres = () => {
    return axios.get("http://localhost:3001/ordres");
  }

  componentDidMount() {
    axios.all([this.getUnites(), this.getOrdres()])
      .then(axios.spread((unites, ordres) => {

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

        // Faire une copie de l'unite
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

    this.props.setInitCards(cards);
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

        {this.props.cardsToDisplay ?
          <div className={style.deckBuilder}>
            <div className="card-list">
              <CardList
                cards={this.props.cardsToDisplay}
                faction={this.state.selectedFaction}
              >
              </CardList>
            </div>
            <div className={style.deckSummary}>
              <DeckSummary cards={this.props.cardsToDisplay}>
              </DeckSummary>
            </div>
          </div> : null}


      </React.Fragment>


    );
  }
}

const mapStateToProps = (state) => {
  return {
    cardsToDisplay: state.deckReducer.cardsToDisplay
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInitCards: (cards) => dispatch({ type: actionTypes.INIT_CARD_DISPLAY, cards: cards })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckBuilder);