export interface IFaction {
  _id: string;
  name: string;
  description: string;
  image: {
    filename_disk: string
  };
  slug: string;
}