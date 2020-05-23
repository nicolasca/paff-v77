import axios from "axios";
import React, { FunctionComponent, useContext } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { config } from "../../../config";
import { ICard } from "../../../models/ICard";
import { IDeckDTO } from "../../../models/IDeck";
import { DeckService } from "../../../services/Deck.services";
import * as actionTypes from "../../../store/actions/actionTypes";
import { UserContext } from "../../Layout/Layout";
import CardList from "../DeckItem/CardList/CardList";
import DeckSummary from "../DeckSummary/DeckSummary";
import styles from "./DeckBuilder.module.css";
import { IEntity } from "../../../models/IEntity";

interface DeckBuilderProps {
  cardsToDisplay: any;
  setInitCards: any;
  history: any;
  resetCount: any;
}

const DeckBuilder: FunctionComponent<DeckBuilderProps> = (props) => {
  const isAuthenticated = useContext(UserContext);

  const { setInitCards } = props;
  const [displayCards, setDisplayCards] = React.useState(false);
  const [selectedEntity, setSelectedEntity] = React.useState<IEntity>(null!);
  const [nom, setNom] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [cards, setCards] = React.useState<ICard[]>([]);
  const [entities, setEntities] = React.useState<IEntity[]>([]);
  const [entitiesOptions, setEntitiesOptions] = React.useState([]);

  React.useEffect(() => {
    axios
      .all([
        axios.get(
          config.directus +
            config.directus_api +
            "/cards?fields=*,entity.*,image.filename_disk"
        ),
        axios.get(config.directus + config.directus_api + "/entities"),
      ])
      .then(
        axios.spread((cardsHttp, entitiesHttp) => {
          setCards(cardsHttp.data.data);

          // Factions
          const entityOptions = entitiesHttp.data.data.map(
            (entity: IEntity) => {
              return (
                <option key={entity.shortname} value={entity.shortname}>
                  {entity.name}
                </option>
              );
            }
          );
          setEntitiesOptions(entityOptions);
          setEntities(entitiesHttp.data.data);
          setSelectedEntity(entitiesHttp.data.data[0]);
        })
      );
  }, []);

  React.useEffect(() => {
    if (selectedEntity) {
      const cardsNew: any = DeckService.populateDeckFromCards(
        cards,
        selectedEntity
      );

      setDisplayCards(true);
      setInitCards(cardsNew);
    }
  }, [selectedEntity, cards, setInitCards]);

  const changeEntityHandler = (event: any) => {
    setDisplayCards(false);
    const entity: IEntity = entities.find(
      (entity) => entity.shortname === event.target.value
    )!;
    setSelectedEntity(entity);
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
      name: nom,
      description: description,
      entity: selectedEntity.id,
    } as IDeckDTO;

    DeckService.saveDeck(deckToSave, props.cardsToDisplay)
      .then(() => {
        // Clean the inputs
        setNom("");
        setDescription("");
        props.resetCount();
        props.history.push("/liste-decks");
      })
      .catch((error) => {
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

            {selectedEntity ? (
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
                    <select onChange={changeEntityHandler} id="TheSelect">
                      {entitiesOptions}
                    </select>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <React.Fragment>
            {selectedEntity ? (
              <div className="control">
                <div className="select">
                  <select onChange={changeEntityHandler} id="TheSelect">
                    {entitiesOptions}
                  </select>
                </div>
              </div>
            ) : null}
          </React.Fragment>
        )}

        {displayCards ? (
          <CardList
            cards={props.cardsToDisplay}
            entity={selectedEntity}
          ></CardList>
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
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setInitCards: (cards: ICard[]) =>
      dispatch({ type: actionTypes.INIT_CARD_DISPLAY, cards: cards }),
    resetCount: () => dispatch({ type: actionTypes.RESET_COUNT }),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeckBuilder)
);
