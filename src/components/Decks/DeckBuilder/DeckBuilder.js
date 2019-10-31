import React, { Component } from 'react';
import DeckSummary from './DeckSummary/DeckSummary';
import DeckItem from '../DeckItem/DeckItem';
import styles from "./DeckBuilder.module.css";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import { config } from '../../../config';
import PropTypes from 'prop-types';

class DeckBuilder extends Component {

  unites = [];
  ordres = [];

  state = {
    selectedFaction: null,
    nom: '',
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
        this.populateCardToDisplay('gaeli');
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
        this.setState({
          ...this.state,
          selectedFaction: unite.faction,
        });
        // Faire une copie de l'unite
        cards[unite.nom] = {
          ...unite,
          count: 0,
        };
      }

    });

    // Populate les ordres
    this.ordres.forEach((ordre) => {
      if (ordre.faction.slug === faction || ordre.faction === 'commun') {

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
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  saveDeckhandler = () => {
    const deckToSave = {
      nom: this.state.nom,
      description: this.state.description,
      faction: this.state.selectedFaction,
      joueur: this.props.username,
      createDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
    };

    const cardsToSave = [];

    Object.keys(this.props.cardsToDisplay).forEach((key, index) => {
      if (this.props.cardsToDisplay[key].count > 0) {
        cardsToSave.push({
          carte: this.props.cardsToDisplay[key],
          nbExemplaires: this.props.cardsToDisplay[key].count,
        });
      }
    });

    deckToSave['cartes'] = cardsToSave;

    var headers = {
      'Authorization': 'Bearer ' + this.props.token,
    }
    axios.post(config.host + ":3008/decks", deckToSave, { headers: headers })
      .then((response) => {
        this.setState({
          ...this.state,
          nom: '',
          description: '',
        });
        this.props.resetCount();
        this.props.history.push('/liste-decks');

      })
      .catch((error) => {
        console.log(error);
      })

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
                  name="nom"
                  className="input"
                  type="text"
                  placeholder="Les Chevaucheurs de Zarn"
                  value={this.state.nom}
                  onChange={this.inputChangeHandler}
                  id="deckName" />
              </div>
            </div>

            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  name="description"
                  className="textarea"
                  placeholder="Ah que ouai"
                  value={this.state.description}
                  onChange={this.inputChangeHandler}
                  id="description" />
              </div>
            </div>

            {this.state.selectedFaction ?
              <div className={[styles.SelectFaction, "field", "is-grouped"].join(' ')}>
                <div className="control">
                  <button className="button is-primary" onClick={this.saveDeckhandler}>A la guerre !</button>
                </div>
                <div className="control">
                  <div className="select">
                    <select onChange={this.changeFactionHandler}
                      value={this.state.selectedFaction.slug}
                      id="TheSelect">
                      <option value="peaux-vertes">Peaux Vertes</option>
                      <option value="sephosi">Sephosi</option>
                      <option value="gaeli">Gaeli</option>
                      <option value="liches">Liches</option>
                    </select>
                  </div>
                </div>
              </div> : null}
          </div>


          {this.props.cardsToDisplay ?

            <DeckItem
              cardsToDisplay={this.props.cardsToDisplay}
              faction={this.state.selectedFaction}
              >

            </DeckItem>
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
    cardsToDisplay: state.deckReducer.cardsToDisplay,
    token: state.authReducer.token,
    username: state.authReducer.username,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInitCards: (cards) => dispatch({ type: actionTypes.INIT_CARD_DISPLAY, cards: cards }),
    resetCount: () => dispatch({ type: actionTypes.RESET_COUNT })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeckBuilder));

DeckBuilder.propTypes = {
  cardsToDisplay: PropTypes.object,
};