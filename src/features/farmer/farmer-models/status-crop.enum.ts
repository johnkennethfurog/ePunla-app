import { LookupItem } from "../../../models/lookup-item";
import enumToLookup from "../../../utils/enum-to-lookup";

export enum StatusCrop {
  Planted = "Planted",
  Harvested = "Harvested",
  Damaged = "Damaged",
}

export const StatusCropList: LookupItem[] = enumToLookup(StatusCrop);
