import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { config } from "../../../config";
import { ICard } from "../../../models/ICard";
import { IDeck } from "../../../models/IDeck";
import { DeckService } from "../../../services/Deck.services";
import * as actionTypes from "../../../store/actions/actionTypes";
import CardList from "../DeckItem/CardList/CardList";
import DeckSummary from "../DeckSummary/DeckSummary";
import styles from "./DeckList.module.scss";

interface DeckListProps {
  token: string;
  setInitCards: any;
  cardsToDisplay: any;
}

const DeckList: FunctionComponent<DeckListProps> = props => {
  const { setInitCards } = props;
  const [deckList, setDeckList] = useState<IDeck[]>([]);
  const [deckListOptions, setDeckListOptions] = useState<JSX.Element[]>([]);
  const [deckSelected, setDeckSelected] = useState<IDeck>(null!);
  const [deckSelectedId, setDeckSelectedId] = useState<string>("");

  useEffect(() => {
    
      DeckService.getDecks().then((decks: IDeck[]) => {
        if (decks.length > 0) {
          const options = decks.map((deck: IDeck) => {
            return (
              <option key={deck.id} value={deck.id}>
                {deck.name}
              </option>
            );
          });
          setDeckListOptions(options);
          setDeckList(decks);
          setDeckSelected(decks[0]);
          setDeckSelectedId(decks[0].id);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [props.token]);

  useEffect(() => {
    if (deckSelected) {
      setInitCards(deckSelected.cards);
    }
  }, [deckSelected, setInitCards]);

  const saveDeckhandler = () => {
    const cardsToSave: ICard[] = [];

    Object.keys(props.cardsToDisplay).forEach((key, index) => {
      cardsToSave.push({
        unit: props.cardsToDisplay[key].unit,
        count: props.cardsToDisplay[key].count
      });
    });

    deckSelected.cards = cardsToSave;


    axios
      .patch(config.directus + config.directus_api + "/decks/" + deckSelected.id, deckSelected, {
        withCredentials: true,
      })
      .then(() => { })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteDeck = () => {

    axios
      .delete(config.directus + config.directus_api + "/decks/" + deckSelected.id, {
        withCredentials: true,
      })
      .then(response => {
        const newDeckList: IDeck[] = deckList.filter(
          (deck: IDeck) => deck.id !== deckSelected.id
        );

        setDeckList(newDeckList);
        setDeckSelected(newDeckList.length > 0 ? newDeckList[0] : null!);
        setDeckSelectedId(newDeckList.length > 0 ? newDeckList[0].id! : "");

        const options = newDeckList.map((deck: IDeck) => {
          return (
            <option key={deck.id} value={deck.id}>
              {deck.name}
            </option>
          );
        });
        setDeckListOptions(options);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const changeDeck = (event: any) => {
    const selectedDeck: IDeck =
      deckList.find((deck: IDeck) => String(deck.id) === event.target.value) || null!;
      
    setDeckSelected(selectedDeck);
    setDeckSelectedId(event.target.value);
  };

  return (
    <div className={styles.DeckList + " container"}>
      <div className={styles.Wrapper}>
        {deckListOptions ? (
          <div className="field is-grouped">
            <div className="control">
              <div className={styles.SelectDecks + " select is-primary"}>
                <select
                  onChange={changeDeck}
                  value={deckSelectedId}
                  id="TheSelect"
                >
                  {deckListOptions}
                </select>
              </div>
            </div>
            <div className="control">
              <button className="button is-primary" onClick={deleteDeck}>
                Supprimer
              </button>
            </div>
            <div className="control">
              <button
                className="button is-primary is-outlined"
                onClick={saveDeckhandler}
              >
                Enregistrer
              </button>
            </div>

            <div className="control">
              <button
                className="button is-primary is-outlined"
              >
                <NavLink exact to="/creer-deck" activeClassName={styles.ActiveNavLink}>
                  Créer
            </NavLink>
              </button>
            </div>
          </div>
        ) : null}

        <div>
          {props.cardsToDisplay && deckSelected ? (
            <CardList
              cards={props.cardsToDisplay}
              faction={deckSelected.faction}
            ></CardList>
          ) : null}
        </div>
      </div>
      {props.cardsToDisplay ? (
        <div className={styles.DeckSummary}>
          <DeckSummary cards={props.cardsToDisplay}></DeckSummary>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    token: state.authReducer.token,
    cardsToDisplay: state.deckReducer.cardsToDisplay
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setInitCards: (cards: ICard[]) =>
      dispatch({ type: actionTypes.INIT_CARD_DISPLAY, cards: cards })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
