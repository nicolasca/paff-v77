import React, { Component } from 'react';
import CardList from './CardList/CardList'
import DeckSummary from './DeckSummary/DeckSummary';
import styles from "./DeckBuilder.module.css";
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import { config } from '../../config';
import PropTypes from 'prop-types';

class DeckBuilder extends Component {

  unites = [];
  ordres = [];

  state = {
    selectedFaction: 'peaux-vertes',
    name: '',
    description: '',
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

  inputChangeHandler = (event) => {
    const value =  event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  saveDeckhandler = () => {
    const deckToSave = {
      name: this.state.name,
      description: this.state.description,
    };
    
    const cardsToSave = [];
    console.log();
    
    Object.keys(this.props.cardsToDisplay).forEach((key, index) => {
      if (this.props.cardsToDisplay[key].count > 0) {
        cardsToSave.push({
          carte: this.props.cardsToDisplay[key],
          nbExemplaires: this.props.cardsToDisplay[key].count,
        });
      }
    });

    deckToSave['cartes'] = cardsToSave;

    console.log(deckToSave);
      
  }

  render() {

    return (
      <div className={styles.DeckBuilder + " container"}>
        <div className={styles.Wrapper}>
          <div className={styles.Title}>
            <h2>Nouveau deck</h2>

            <div className="field">
              <label className="label">Nom</label>
              <div className="control">
                <input 
                  className="input"
                  type="text"
                  placeholder="Les Chevaucheurs de Zarn"
                  onChange={this.inputChangeHandler}
                  id="deckName" />
              </div>
          </div>

          <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea 
                  className="textarea"
                  placeholder="Ah que ouai"
                  onChange={this.inputChangeHandler} 
              id="description" />
              </div>
          </div>

          <div className={[styles.SelectFaction, "field", "is-grouped"].join(' ')}>
            <div className="control">
              <button className="button is-primary" onClick={this.saveDeckhandler}>A la guerre !</button>
            </div>
            <p className="control">
            <div class="select">
              <select onChange={this.changeFactionHandler}
                value={this.state.selectedFaction}
                id="TheSelect">
              <option value="peaux-vertes">Peaux Vertes</option>
                  <option value="sephosi">Sephosi</option>
                  <option value="gaeli">Gaeli</option>
                  <option value="liches">Liches</option>
              </select>
            </div>
            </p>
          </div>
         </div>
          

          {this.props.cardsToDisplay ?
            <div className={styles.CardList}>
              <div>
                <CardList
                  cards={this.props.cardsToDisplay}
                  faction={this.state.selectedFaction}
                >
                </CardList>
              </div>
            </div>
            : null}
        </div>

        {this.props.cardsToDisplay ?

          <div className={styles.DeckSummary}>
            <DeckSummary cards={this.props.cardsToDisplay}>
            </DeckSummary>
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

DeckBuilder.propTypes = {
  cardsToDisplay: PropTypes.object,
};