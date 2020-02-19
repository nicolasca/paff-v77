import { ICapacity } from "./../models/ICard";
import { config } from "../config";

const getUnits = async (factionSlug: string) => {
  const response = await fetch(
    config.directus +
      "/paff/items/units?fields=*,faction.*,capacities.*.*,image.filename_disk&filter[faction.slug][like]=" +
      factionSlug
  );
  const units = await response.json();
  units.data.forEach((unit: any) => {
    if (unit.capacities.length > 0) {
      const newCapacities: ICapacity[] = [];
      unit.capacities.forEach((capacity: any) => {
        newCapacities.push(capacity["capacities"] as ICapacity);
      });
      unit.capacities = newCapacities;
    }
  });
  return units;
};

export const UnitsService = {
  getUnits
};
