export interface IFaction {
  id: string;
  name: string;
  description: string;
  color_text: string;
  color_background: string;
  image: {
    filename_disk: string;
  };
  slug: string;
}
