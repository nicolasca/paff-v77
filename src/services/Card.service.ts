import { config } from "../config";

const getCards = async (shortname: string) => {
  const response = await fetch(
    config.directus +
      config.directus_api +
      "/Cards?fields=*,faction.*,entity.*,image.filename_disk&filter[entity][shortname][_eq]=" +
      shortname
  );
  const units = await response.json();
  return units;
};

export const CardService = {
  getCards,
};
