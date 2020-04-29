import { config } from "../config";
import { ICapacity, IUnit } from "./../models/ICard";


const getUnits = async (factionSlug: string) => {
  const response = await fetch(
    config.directus + config.directus_api +
    "/units?fields=*,faction.*,capacities.*.*,image.filename_disk&filter[faction.slug][like]=" +
    factionSlug
  );
  const units = await response.json();
  setCapacities(units.data)
  return units;
};

const setCapacities = (units: IUnit[]) => {
  units.forEach((unit: any) => {
    if (unit.capacities.length > 0) {
      const newCapacities: ICapacity[] = [];
      unit.capacities.forEach((capacity: any) => {
        newCapacities.push(capacity["capacities"] as ICapacity);
      });
      unit.capacities = newCapacities;
    }
  });
  return units;
}

export const UnitsService = {
  getUnits,
  setCapacities,
};
