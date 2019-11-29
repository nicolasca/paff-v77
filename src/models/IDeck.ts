import { ICard } from "./ICard";
import { IFaction } from "./IFaction";

export interface IDeck {
  nom: string;
  description: string;
  faction: IFaction;
  joueur: string;
  cartes: ICard[];
  createDate: string;
  updateDate: string;
}