import { config } from "../config";

const getFactions = async () => {
  const response = await fetch(
    config.directus + config.directus_api +
      "/factions?fields=*,order.*,image.filename_disk"
  );
  const result = response.json();
  return result;
};

export const FactionService = {
  getFactions
};
