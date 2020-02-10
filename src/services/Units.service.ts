import { config } from "../config";


const getUnits = async (factionSlug: string) => {
  const response = await fetch(config.directus +
    '/paff/items/units?fields=*,image.filename_disk&filter[faction.slug][like]=' + factionSlug)
  return response.json();
}

export const UnitsService = {
  getUnits
}