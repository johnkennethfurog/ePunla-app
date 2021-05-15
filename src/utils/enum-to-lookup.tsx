import { DamageCause } from "../features/farmer/farmer-models/damage-cause.enum";
import { LookupItem } from "../models/lookup-item";

const enumToLookup = (Enum: any): LookupItem[] => {
  const lookups: LookupItem[] = [];
  for (const [propertyKey, propertyValue] of Object.entries(DamageCause)) {
    if (!Number.isNaN(Number(propertyKey))) {
      continue;
    }
    lookups.push({ id: propertyValue, value: propertyKey });
  }

  return lookups;
};

export default enumToLookup;
