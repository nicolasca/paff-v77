import { IEntity } from "./../models/IEntity";
import axios from "axios";
import { config } from "../config";
import { ICard } from "./../models/ICard";
import { IDeck, IDeckDTO } from "./../models/IDeck";

const getDecks = () => {
  const decksToshow: IDeck[] = [];

  return axios
    .all([
      axios.get(
        config.directus +
          config.directus_api +
          "/decks?fields=*,cards.*,cards.cards_id.*, units.units_id.entity.*,cards.cards_id.image.filename_disk",
        { withCredentials: true }
      ),
      // axios.get(config.directus + config.directus_api +
      //   "/decks_units?fields=*,units_id.*.*,units_id.capacities.capacities.*"),
    ])
    .then(
      axios.spread((decksHttp, decks_unitsHttp) => {
        const decks = decksHttp.data.data;

        decks.forEach((deck: any) => {
          deck.cards = [];
          deck.units.forEach((unit: any) => {
            deck.cards[unit.units_id.name] = {
              unit: unit,
              count: unit.count,
            };
          });
          delete deck.units;
          decksToshow.push(deck);
        });
      })
    )
    .then(() => {
      return decksToshow;
    });
};

const populateDeckFromCards: any = (
  cards: ICard[],
  selectedFaction: IEntity
): any => {
  const cardsPopulated: any = {};

  // Populate les unites
  cards.forEach((card) => {
    if (card.entity.shortname === selectedFaction.shortname) {
      cardsPopulated[card.name] = {
        ...card,
        count: 0,
      };
    }
  });

  return cardsPopulated;
};

const saveDeck = (deckToSave: IDeckDTO, cards: any) => {
  const cardsToSave: any = [];

  // First save the deck
  return axios
    .post(config.directus + config.directus_api + "/decks", deckToSave, {
      withCredentials: true,
    })
    .then((deck) => {
      // const deck = response.json();
      // Create entries for the join table decks_units
      Object.keys(cards).forEach((key, index) => {
        cardsToSave.push({
          decks_id: deck.data.data.id,
          units_id: cards[key].id,
          count: cards[key].count,
        });
      });

      return axios.post(
        config.directus + config.directus_api + "/decks_units",
        cardsToSave,
        { withCredentials: true }
      );
    });
};

const updateDeck = (deckToUpdate: IDeck, cards: any) => {
  const cardsToSave: any = [];

  // First save the deck
  return axios
    .post(
      config.directus + config.directus_api + "/decks/" + deckToUpdate.id,
      deckToUpdate,
      { withCredentials: true }
    )
    .then((deck) => {
      // Create entries for the join table decks_units
      Object.keys(cards).forEach((key, index) => {
        cardsToSave.push({
          decks_id: deck.data.data.id,
          units_id: cards[key].id,
          count: cards[key].count,
        });
      });

      return axios.patch(
        config.directus + config.directus_api + "/decks_units",
        cardsToSave,
        { withCredentials: true }
      );
    });
};

export const DeckService = {
  populateDeckFromCards,
  saveDeck,
  getDecks,
};
