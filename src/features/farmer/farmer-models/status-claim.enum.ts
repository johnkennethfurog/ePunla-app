import { LookupItem } from "../../../models/lookup-item";

export enum StatusClaim {
  Pending = "Pending",
  Claimed = "Claimed",
  Denied = "Denied",
}

export const StatusClaimList: LookupItem[] = Object.values(StatusClaim).map(
  (stat) => {
    return { id: stat, value: stat };
  }
);
