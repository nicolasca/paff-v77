import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { IDeck } from "../../../models/IDeck";
import styles from "./Draft.module.scss";
import { DeckService } from "../../../services/Deck.services";

interface DraftProps {
  token: string;
  onClickHandler: Function;
}

const Draft: FunctionComponent<DraftProps> = (props) => {
  const [options, setOptions] = useState<JSX.Element[]>([]);
  const [decks, setDecks] = useState<IDeck[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<IDeck>(null!);
  const [isValidated, setValidated] = useState<boolean>(false);

  useEffect(() => {
    DeckService.getDecks().then((decks) => {
      // Set decks
      setDecks(decks);
      setSelectedDeck(decks[0]);
      setOptions(getSelectOptions(decks));
    });
  }, [setOptions, setDecks, setSelectedDeck, props.token]);

  const getSelectOptions = (decks: IDeck[]) => {
    return decks.map((deck) => {
      return (
        <option key={deck.id} value={deck.id}>
          {deck.name}
        </option>
      );
    });
  };

  const changeDeckHandler = (event: any) => {
    const deck = decks.find((deck) => deck.id === event.target.value);
    if (deck) setSelectedDeck(deck);
  };

  const validateDeckHandler = () => {
    setValidated(true);
    props.onClickHandler(selectedDeck);
  };

  return (
    <div>
      {options && !isValidated ? (
        <React.Fragment>
          <label className="label">Tes decks</label>
          <div className="control">
            <div className="select">
              <select onChange={changeDeckHandler} id="TheSelect">
                {options}
              </select>
            </div>
          </div>
          <button className="button" onClick={validateDeckHandler}>
            Choisir
          </button>
        </React.Fragment>
      ) : null}

      {isValidated ? (
        <div>
          <p>Armée qui part à la guerre: {selectedDeck.name} </p>
          <p className={styles.Waiting}>
            En attente du général adverse<span>.</span>
            <span>.</span>
            <span>.</span>
          </p>
        </div>
      ) : null}
    </div>
  );
};

const mapPropsToState = (state: any) => {
  return {
    token: state.authReducer.token,
  };
};

export default connect(mapPropsToState)(Draft);
