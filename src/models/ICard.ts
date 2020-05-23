import { IEntity } from "./IEntity";
import { IFaction } from "./IFaction";

export interface ICard {
  id: string;
  name: string;
  faction: IFaction;
  entity: IEntity;
  cost: number;
  capacity: string;
  max_in_deck: number;
  image: {
    filename_disk: string;
  };
  attack?: number;
  life?: number;
  type_unit?: string;
  count?: number;
}

export interface ICardInDeck {
  card: ICard;
  count: number;
}
