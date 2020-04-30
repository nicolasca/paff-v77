import axios from "axios";
import { config } from "../config";
import { IFaction } from "../models/IFaction";
import { ICapacity, IUnit } from "./../models/ICard";
import { IDeck, IDeckDTO } from "./../models/IDeck";

const getDecks = () => {
  const decksToshow: IDeck[] = [];

  return axios
    .all([
      axios.get(
        config.directus +
          config.directus_api +
          "/decks?fields=*,units.*,units.units_id.*,units.units_id.capacities.*.*, units.units_id.faction.*,units.units_id.image.filename_disk",
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
            const unitWithCapacities = setCapacities(unit.units_id);
            deck.cards[unit.units_id.name] = {
              unit: unitWithCapacities,
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

const setCapacities = (unit: IUnit) => {
  if (unit.capacities.length > 0) {
    const newCapacities: ICapacity[] = [];
    unit.capacities.forEach((capacity: any) => {
      newCapacities.push(capacity["capacities"] as ICapacity);
    });
    unit.capacities = newCapacities;
  }
  return unit;
};

const populateDeckFromCards: any = (
  units: IUnit[],
  selectedFaction: IFaction
): any => {
  const cards: any = {};

  // Populate les unites
  units.forEach((unite) => {
    if (unite.faction.slug === selectedFaction.slug) {
      cards[unite.name] = {
        unit: unite,
        count: 0,
      };
    }
  });
  return cards;
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
