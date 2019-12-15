import { IDeck } from './../models/IDeck';
import { IUnite, IOrder, ICard } from './../models/ICard';
import { IFaction } from '../models/IFaction';
import { config } from '../config';
import axios from 'axios';


const populateDeckFromCards: any = (units: IUnite[], orders: IOrder[], selectedFaction: IFaction): any => {

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

  // Populate les ordres
  orders.forEach((ordre) => {
    if ((typeof ordre.faction === 'object' && ordre.faction.slug === selectedFaction.slug) ||
      ordre.faction === 'commun') {
      // Faire une copie de l'ordre
      cards[ordre.nom] = {
        ...ordre,
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