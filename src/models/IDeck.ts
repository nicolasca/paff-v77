import { ICard } from "./ICard";
import { IFaction } from "./IFaction";

export interface IDeck {
  id: string;
  name: string;
  description: string;
  faction: IFaction;
  cards: ICard[];
  modified_by: string;
  modified_on: string;
}

export interface IDeckDTO {
  name: string;
  description: string;
  faction: string;
}
