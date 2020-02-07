import axios from "axios";
import React, { FunctionComponent, useContext } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { config } from "../../../config";
import { ICard, IOrder, IUnite } from "../../../models/ICard";
import { IDeck } from "../../../models/IDeck";
import { IFaction } from "../../../models/IFaction";
import * as actionTypes from "../../../store/actions/actionTypes";
import { UserContext } from "../../Layout/Layout";
import DeckItem from "../DeckItem/DeckItem";
import styles from "./DeckBuilder.module.css";
import DeckSummary from "../DeckSummary/DeckSummary";
import { DeckService } from "../../../services/Deck.services";

interface DeckBuilderProps {
  cardsToDisplay: any;
  setInitCards: any;
  username: string;
  token: string;
  history: any;
  resetCount: any;
}

const DeckBuilder: FunctionComponent<DeckBuilderProps> = props => {
  const isAuthenticated = useContext(UserContext);

  const { setInitCards } = props;
  const [displayCards, setDisplayCards] = React.useState(false);
  const [selectedFaction, setSelectedFaction] = React.useState<IFaction>(null!);
  const [nom, setNom] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [unites, setUnites] = React.useState<IUnite[]>([]);
  const [ordres, setOrdres] = React.useState<IOrder[]>([]);
  const [factions, setFactions] = React.useState<IFaction[]>([]);
  const [factionsOptions, setFactionsOptions] = React.useState([]);

  React.useEffect(() => {
    axios
      .all([
        axios.get(config.host + ":3008/unites"),
        axios.get(config.host + ":3008/factions"),
        axios.get(config.host + ":3008/ordres")
      ])
      .then(
        axios.spread((unitesHttp, factionsHttp, ordresHttp) => {
          setUnites(unitesHttp.data);
          setOrdres(ordresHttp.data);

          // Factions
          const factionOptions = factionsHttp.data.map((faction: IFaction) => {
            return (
              <option key={faction.slug} value={faction.slug}>
                {faction.nom}
              </option>
            );
          });
          setFactionsOptions(factionOptions);
          setFactions(factionsHttp.data);
          setSelectedFaction(factionsHttp.data[0]);
        })
      );
  }, []);

  React.useEffect(() => {
    if (selectedFaction) {
      const cards: any = DeckService.populateDeckFromCards(
        unites,
        ordres,
        selectedFaction
      );
      setDisplayCards(true);
      setInitCards(cards);
    }
  }, [selectedFaction, unites, ordres, setInitCards]);

  const changeFactionHandler = (event: any) => {
    setDisplayCards(false);
    const faction: IFaction = factions.find(
      faction => faction.slug === event.target.value
    )!;
    setSelectedFaction(faction);
  };

  const nomChangeHandler = (event: any) => {
    const value = event.target.value;
    setNom(value);
  };

  const descriptionChangeHandler = (event: any) => {
    const value = event.target.value;
    setDescription(value);
  };

  const saveDeckhandler = () => {
    const deckToSave = {
      nom: nom,
      description: description,
      faction: selectedFaction,
      joueur: props.username,
      cartes: [],
      createDate: new Date().toISOString(),
      updateDate: new Date().toISOString()
    } as IDeck;

    DeckService.saveDeck(deckToSave, props.cardsToDisplay, props.token)
      .then(() => {
        // Clean the inputs
        setNom("");
        setDescription("");
        props.resetCount();
        props.history.push("/liste-decks");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className={styles.DeckBuilder + " container"}>
      <div className={styles.Wrapper}>
        {isAuthenticated ? (
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
                  id="deckName"
                />
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
                  id="description"
                />
              </div>
            </div>

            {selectedFaction ? (
              <div
                className={[styles.SelectFaction, "field", "is-grouped"].join(
                  " "
                )}
              >
                <div className="control">
                  <button
                    className="button is-primary"
                    onClick={saveDeckhandler}
                  >
                    A la guerre !
                  </button>
                </div>
                <div className="control">
                  <div className="select is-primary">
                    <select onChange={changeFactionHandler} id="TheSelect">
                      {factionsOptions}
                    </select>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <React.Fragment>
            {selectedFaction ? (
              <div className="control">
                <div className="select">
                  <select onChange={changeFactionHandler} id="TheSelect">
                    {factionsOptions}
                  </select>
                </div>
              </div>
            ) : null}
          </React.Fragment>
        )}

        {displayCards ? (
          <DeckItem
            cardsToDisplay={props.cardsToDisplay}
            faction={selectedFaction}
          ></DeckItem>
        ) : null}
      </div>

      {displayCards ? (
        <div className={styles.DeckSummary}>
          <DeckSummary cards={props.cardsToDisplay}></DeckSummary>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cardsToDisplay: state.deckReducer.cardsToDisplay,
    token: state.authReducer.token,
    username: state.authReducer.username
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setInitCards: (cards: ICard[]) =>
      dispatch({ type: actionTypes.INIT_CARD_DISPLAY, cards: cards }),
    resetCount: () => dispatch({ type: actionTypes.RESET_COUNT })
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeckBuilder)
);
