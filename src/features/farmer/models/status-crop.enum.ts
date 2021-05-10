import { LookupItem } from "../../../models/lookup-item";

export enum StatusCrop {
  Planted = "Planted",
  Harvested = "Harvested",
  Damaged = "Damaged",
}

export const StatusCropList: LookupItem[] = Object.values(StatusCrop).map(
  (stat) => {
    return { id: stat, value: stat };
  }
);
