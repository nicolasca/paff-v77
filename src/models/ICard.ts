import { IFaction } from "./IFaction";

export interface ICard {
  carte: IUnit;
  nbExemplaires: number;
}

export interface IUnit {
  _id: string;
  name: string;
  slug: string;
  type: string;
  faction: IFaction;
  deploy: number;
  regiment: number;
  att_cac: number;
  is_att_cac_magic: number;
  att_shoot: number;
  is_att_shoot_magic: number;
  def_cac: number;
  def_shoot: number;
  image: {
    filename_disk: string;
  };
  capacities: ICapacity[];
  count?: number;
}

export interface ICapacity {
  name: string;
  slug: string;
  effect: string;
}
