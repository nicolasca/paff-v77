import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { config } from '../../../config';
import * as actionTypes from '../../../store/actions/actionTypes';
import DeckItem from '../DeckItem/DeckItem';
import styles from "./DeckBuilder.module.css";
import DeckSummary from './DeckSummary/DeckSummary';

function DeckBuilder(props) {

  const { setInitCards } = props;
  const [selectedFaction, setSelectedFaction] = useState(null);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [unites, setUnites] = useState([]);
  const [ordres, setOrdres] = useState([]);

  useEffect(() => {
    axios.all([
      axios.get(config.host + ":3008/unites"),
      axios.get(config.host + ":3008/ordres")])
      .then(axios.spread((unitesHttp, ordresHttp) => {

        setUnites(unitesHttp.data);
        setOrdres(ordresHttp.data);

        setSelectedFaction(unitesHttp.data[0].faction.slug);
      }));
  }, [])

  useEffect(() => {
    if (selectedFaction) {

      const cards = [];
      // Populate les unites
      unites.forEach((unite) => {
        if (unite.faction.slug === selectedFaction) {
          cards[unite.nom] = {
            ...unite,
            count: 0,
          };
        }
      });

      // Populate les ordres
      ordres.forEach((ordre) => {
        if (ordre.faction.slug === selectedFaction.slug || ordre.faction === 'commun') {
          // Faire une copie de l'ordre
          cards[ordre.nom] = {
            ...ordre,
            count: 0,
          };
        }
      });

      setInitCards(cards);
    }


  }, [selectedFaction, unites, ordres, setInitCards]);

  const changeFactionHandler = (event) => {
    setSelectedFaction(event.target.value);
  }


  const nomChangeHandler = (event) => {
    const value = event.target.value;
    setNom(value);
  }

  const descriptionChangeHandler = (event) => {
    const value = event.target.value;
    setDescription(value);
  }

  const saveDeckhandler = () => {
    const deckToSave = {
      nom: nom,
      description: description,
      faction: selectedFaction,
      joueur: props.username,
      createDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
    };

    const cardsToSave = [];

    Object.keys(props.cardsToDisplay).forEach((key, index) => {
      if (props.cardsToDisplay[key].count > 0) {
        cardsToSave.push({
          carte: props.cardsToDisplay[key],
          nbExemplaires: props.cardsToDisplay[key].count,
        });
      }
    });

    deckToSave['cartes'] = cardsToSave;

    var headers = {
      'Authorization': 'Bearer ' + props.token,
    }
    axios.post(config.host + ":3008/decks", deckToSave, { headers: headers })
      .then(() => {
        setNom('');
        setDescription('');

        props.resetCount();
        props.history.push('/liste-decks');

      })
      .catch((error) => {
        console.log(error);
      })

  }



  return (
    <div className={styles.DeckBuilder + " container"}>
      <div className={styles.Wrapper}>
        <div className={styles.Title}>
          <div className="field">
            <label className="label">Nom</label>
            <div className="control">
              <input
                name="nom"
                className="input"
                type="text"
                placeholder="Les Chevaucheurs de Zarn"
                value={nom}
                onChange={nomChangeHandler}
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
                value={description}
                onChange={descriptionChangeHandler}
                id="description" />
            </div>
          </div>

          {selectedFaction ?
            <div className={[styles.SelectFaction, "field", "is-grouped"].join(' ')}>
              <div className="control">
                <button className="button is-paff" onClick={saveDeckhandler}>A la guerre !</button>
              </div>
              <div className="control">
                <div className="select">
                  <select onChange={changeFactionHandler}
                    value={selectedFaction}
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


        {props.cardsToDisplay ?

          <DeckItem
            cardsToDisplay={props.cardsToDisplay}
            faction={selectedFaction}
          >

          </DeckItem>
          : null}
      </div>

      {props.cardsToDisplay ?

        <div className={styles.DeckSummary}>
          <DeckSummary cards={props.cardsToDisplay}>
          </DeckSummary>
        </div> : null}
    </div>
  );

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
  username: PropTypes.string,
  token: PropTypes.string,
};