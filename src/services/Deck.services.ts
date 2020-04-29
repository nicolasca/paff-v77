import axios from "axios";
import { config } from "../config";
import { IFaction } from "../models/IFaction";
import { IUnit } from "./../models/ICard";
import { IDeckDTO } from "./../models/IDeck";

const populateDeckFromCards: any = (
  units: IUnit[],
  selectedFaction: IFaction
): any => {
  const cards: any = {};

  // Populate les unites
  units.forEach(unite => {
    if (unite.faction.slug === selectedFaction.slug) {
      cards[unite.name] = {
        ...unite,
        count: 0
      };
    }
  });

  return cards;
};

const saveDeck = (deckToSave: IDeckDTO, cards: any) => {
  const cardsToSave: any = [];

  // First save the deck
  return axios.post(
    config.directus + config.directus_api + "/decks",
    deckToSave,
    { withCredentials: true }).then((deck) => {
      // const deck = response.json();
      // Create entries for the join table decks_units
      Object.keys(cards).forEach((key, index) => {
        cardsToSave.push({
          decks_id: deck.data.data.id,
          units_id: cards[key].id,
          count: cards[key].count
        });
      });

      return axios.post(
        config.directus + config.directus_api + "/decks_units",
        cardsToSave,
        { withCredentials: true })
    });
};

export const DeckService = {
  populateDeckFromCards,
  saveDeck
};
