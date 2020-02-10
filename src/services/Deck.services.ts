import axios from 'axios';
import { config } from '../config';
import { IFaction } from '../models/IFaction';
import { ICard, IOrder, IUnit } from './../models/ICard';
import { IDeck } from './../models/IDeck';


const populateDeckFromCards: any = (units: IUnit[], orders: IOrder[], selectedFaction: IFaction): any => {

  const cards: any = {};

  // Populate les unites
  units.forEach((unite) => {
    if (unite.faction.slug === selectedFaction.slug) {
      cards[unite.nom] = {
        ...unite,
        count: 0,
      };
    }
  });

  return cards;
};

const saveDeck = (deckToSave: IDeck, cards: any, token: string) => {
  const cardsToSave: ICard[] = [];

  Object.keys(cards).forEach((key, index) => {
    cardsToSave.push({
      carte: cards[key],
      nbExemplaires: cards[key].count,
    });
  });

  deckToSave['cartes'] = cardsToSave;

  var headers = {
    'Authorization': 'Bearer ' + token,
  }
  return axios.post(config.host + ":3008/decks", deckToSave, { headers: headers });
}

export const DeckService = {
  populateDeckFromCards,
  saveDeck,
};