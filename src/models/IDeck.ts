import { IEntity } from "./IEntity";
import { ICard, ICardInDeck } from "./ICard";
import { IFaction } from "./IFaction";

export interface IDeck {
  id: string;
  name: string;
  description: string;
  entity: IEntity;
  cards: ICardInDeck[];
  modified_by: string;
  modified_on: string;
}

export interface IDeckDTO {
  name: string;
  description: string;
  entity: string;
}
