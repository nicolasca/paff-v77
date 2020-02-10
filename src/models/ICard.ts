
import { IFaction } from './IFaction';

export interface ICard {
  carte: IUnit;
  nbExemplaires: number;
}

export interface IUnit {
  _id: string;
  nom: string;
  slug: string;
  type: string;
  faction: IFaction;
  deploy: number;
  regiment: number;
  attCac: number;
  isAttCacMagique: number;
  attTir: number;
  isAttTirMagique: number;
  defCac: number;
  defTir: number;
  image: {
    filename_disk: string
  };
  capacites: ICapacity[];
  count?: number;
  
}

export interface IOrder {
  _id: number;
  faction: IFaction | string;
  type: string;
  nom: string;
  description: string;
  limite: number;
  recuperable: number;
}

export interface ICapacity {
  nom: string;
  slug: string;
  description: string;
}