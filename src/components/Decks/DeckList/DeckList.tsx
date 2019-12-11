import axios from 'axios';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { config } from '../../../config';
import { ICard, IUnite } from '../../../models/ICard';
import { IDeck } from '../../../models/IDeck';
import * as actionTypes from '../../../store/actions/actionTypes';
import DeckSummary from '../DeckBuilder/DeckSummary/DeckSummary';
import DeckItem from '../DeckItem/DeckItem';
import styles from './DeckList.module.scss';

interface DeckListProps {
  token: string;
  setInitCards: any;
  cardsToDisplay: IUnite[];
}

const DeckList: FunctionComponent<DeckListProps> = (props) => {

  const { setInitCards } = props;
  const [deckList, setDeckList] = useState<IDeck[]>([]);
  const [deckListOptions, setDeckListOptions] = useState<JSX.Element[]>([]);
  const [deckSelected, setDeckSelected] = useState<IDeck>(null!);
  const [deckSelectedId, setDeckSelectedId] = useState<string>('');

  useEffect(() => {
    const headers = {
      'Authorization': 'Bearer ' + props.token,
    }
    axios.get(config.host + ':3008/decks', { headers }).then((response) => {
      if (response.data && response.data.length > 0) {

        const options = response.data.map((deck: IDeck) => {
          return (
            <option key={deck._id} value={deck._id}>{deck.nom}</option>
          )
        });
        setDeckListOptions(options);
        setDeckList(response.data);
        setDeckSelected(response.data[0]);
        setDeckSelectedId(response.data[0]._id);

      }
    })
      .catch(error => {
        console.log(error);
      })
  }, [props.token]);

  useEffect(() => {
    const cards: any = {};
    if (deckSelected) {
      
      deckSelected.cartes.forEach((card: ICard) => {
        cards[card.carte.nom] = card.carte;
      });
      setInitCards(cards);
    }

  }, [deckSelected, setInitCards])


  const deleteDeck = () => {
    var headers = {
      'Authorization': 'Bearer ' + props.token,
    };
    axios.delete(config.host + ":3008/decks/" + deckSelected._id, { headers: headers })
      .then((response) => {
        const newDeckList: IDeck[] = deckList.filter((deck: IDeck) => deck._id !== deckSelected._id);

        setDeckList(newDeckList);
        setDeckSelected(newDeckList.length > 0 ? newDeckList[0] : null!);
        setDeckSelectedId(newDeckList.length > 0 ? newDeckList[0]._id! : "");

        const options = newDeckList.map((deck: IDeck) => {
          return (
            <option key={deck._id} value={deck._id}>{deck.nom}</option>
          )
        });
        setDeckListOptions(options);


   

      })
      .catch((error) => {
        console.log(error);
      });
  }

  const changeDeck = (event: any) => {
    const selectedDeck: IDeck = deckList.find((deck: IDeck) => deck._id === event.target.value) || null!;
    
    setDeckSelected(selectedDeck);
    setDeckSelectedId(event.target.value);
  }


  return (
    <div className={styles.DeckList + " container"}>
      <div className={styles.Wrapper}>
        {deckListOptions ?
          <div>
            <div className="control" >
              <div className={styles.SelectDecks + " select "}>
                <select onChange={changeDeck}
                  value={deckSelectedId}
                  id="TheSelect">
                  {deckListOptions}
                </select>
              </div>
            </div>
            <div className="control">
              < button className="button is-paff" onClick={deleteDeck}>Supprimer</button>
            </div>
          </div> : null}

        <div>
          {(props.cardsToDisplay && deckSelected) ?
            <DeckItem
              cardsToDisplay={props.cardsToDisplay}
              faction={deckSelected.faction}
            ></DeckItem>
            : null}
        </div>
      </div>
      {props.cardsToDisplay ?

        <div className={styles.DeckSummary}>
          <DeckSummary cards={props.cardsToDisplay}>
          </DeckSummary>
        </div> : null}
    </div >
  );

}

const mapStateToProps = (state: any) => {
  return {
    token: state.authReducer.token,
    cardsToDisplay: state.deckReducer.cardsToDisplay,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setInitCards: (cards: ICard[]) => dispatch({ type: actionTypes.INIT_CARD_DISPLAY, cards: cards }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
