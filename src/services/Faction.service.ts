import { config } from "../config";

const getFactions = async () => {
  const response = await fetch(
    config.directus +
      "/paff/items/factions?fields=*,order.*,image.filename_disk"
  );
  const result = response.json();
  return result;
};

export const FactionService = {
  getFactions
};
