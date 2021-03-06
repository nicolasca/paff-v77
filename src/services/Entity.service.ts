import { config } from "../config";

const getEntities = async () => {
  const response = await fetch(
    config.directus + config.directus_api + "/entity"
  );
  const result = response.json();
  return result;
};

export const EntityService = {
  getEntities,
};
