import { LookupItem } from "./lookup-item";

export enum StatusFarm {
  Pending = "Pending",
  Rejected = "Rejected",
  Approved = "Approved",
}

export const StatusFarmList: LookupItem[] = Object.values(StatusFarm).map(
  (stat) => {
    return { id: stat, value: stat };
  }
);
