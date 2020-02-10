export interface IFaction {
  _id: string;
  name: string;
  description: string;
  image: {
    filename_disk: string;
  };
  slug: string;
  order: ISpecialOrder;
}

export interface ISpecialOrder {
  _id: number;
  slug: string;
  name: string;
  description: string;
  pc_cost: number;
}
