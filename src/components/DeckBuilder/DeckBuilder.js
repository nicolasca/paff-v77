import React, { Component } from 'react';
import CardList from './CardList/CardList'
import DeckSummary from './DeckSummary/DeckSummary';
import styles from "./DeckBuilder.module.css";
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import { config } from '../../config';

class DeckBuilder extends Component {

  unites = [];
  ordres = [];

  state = {
    selectedFaction: 'peaux-vertes',
  }

  getUnites = () => {
    return axios.get(config.host + ":3008/unites");
  }

  getOrdres = () => {
    return axios.get(config.host + ":3008/ordres");
  }

  componentDidMount() {
    axios.all([this.getUnites(), this.getOrdres()])
      .then(axios.spread((unites, ordres) => {

        this.unites = unites.data;
        this.ordres = ordres.data;
        this.populateCardToDisplay('peaux-vertes');
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
      if (unite.faction.slug === faction) {

        // Faire une copie de l'unite
        cards[unite.nom] = {
          ...unite,
          count: 0,
        };
      }

    });
    console.log(cards);


    // Populate les ordres
    this.ordres.forEach((ordre) => {
      if (ordre.factionSlug === faction || ordre.factionSlug === 'commun') {

        // Faire une copie de l'ordre
        cards[ordre.nom] = {
          ...ordre,
          count: 0,
        };
      }
    });

    this.props.setInitCards(cards);
  }

  render() {

    return (
      <div className="container">
        <div className={styles.Title}>
          <h2>Nouveau deck</h2>
          <label htmlFor="deckName">Nom du deck</label>
          <input type="text" placeholder="Les Chevaucheurs de Zarn" id="deckName"></input>
          <button>A la guerre !</button>
        </div>
        <div className={styles.FieldSelect}>
        <label for="TheSelect" >Ma faction</label>
        <div className={styles.FieldSelectContainer}>
          <select onChange={this.changeFactionHandler} value={this.state.selectedFaction} id="TheSelect">
            <option value="peaux-vertes">Peaux Vertes</option>
            <option value="sephosi">Sephosi</option>
            <option value="gaeli">Gaeli</option>
            <option value="liches">Liches</option>
          </select>
          </div>
        </div>

        {this.props.cardsToDisplay ?
          <div className={styles.DeckBuilder}>
            <div className="card-list">
              <CardList
                cards={this.props.cardsToDisplay}
                faction={this.state.selectedFaction}
              >
              </CardList>
            </div>
            <div className={styles.DeckSummary}>
              <DeckSummary cards={this.props.cardsToDisplay}>
              </DeckSummary>
            </div>
          </div> : null}


      </div>


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