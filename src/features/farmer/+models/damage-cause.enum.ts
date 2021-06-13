import { LookupItem } from "../../../models/lookup-item";
import enumToLookup from "../../../utils/enum-to-lookup";

export enum DamageCause {
  Pest = 1,
  Rain = 2,
  Others = 3,
}

export const DamageCauseList: LookupItem[] = enumToLookup(DamageCause);
