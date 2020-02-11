import axios from "axios";
import { config } from "../config";
import { IFaction } from "../models/IFaction";
import { ICard, IUnit } from "./../models/ICard";
import { IDeck } from "./../models/IDeck";

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

const saveDeck = (deckToSave: IDeck, cards: any) => {
  const cardsToSave: ICard[] = [];

  Object.keys(cards).forEach((key, index) => {
    cardsToSave.push({
      carte: cards[key],
      nbExemplaires: cards[key].count
    });
  });

  deckToSave["cartes"] = cardsToSave;

  return axios.post(config.host + ":3008/decks", deckToSave);
};

export const DeckService = {
  populateDeckFromCards,
  saveDeck
};
