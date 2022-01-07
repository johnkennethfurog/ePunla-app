import { LookupItem } from "./lookup-item";

export enum StatusClaim {
  Pending = "Pending",
  Claimed = "Claimed",
  Denied = "Denied",
  ForVerification = "ForVerification",
  Approved = "Approved",
}

export const StatusClaimList: LookupItem[] = Object.values(StatusClaim).map(
  (stat) => {
    return { id: stat, value: stat };
  }
);
