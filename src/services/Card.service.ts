import { config } from "../config";

const getCards = async (entityShortName: string) => {
  const response = await fetch(
    config.directus +
      config.directus_api +
      "/cards?fields=*,faction.*,image.filename_disk&filter[entity.shortname][like]=" +
      entityShortName
  );
  const units = await response.json();
  return units;
};

export const CardService = {
  getCards,
};
