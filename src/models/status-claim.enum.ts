import { LookupItem } from "./lookup-item";

export enum StatusClaim {
  Pending = "Pending",
  Claimed = "Claimed",
  Denied = "Denied",
  ForVerification = "ForVerification",
}

export const StatusClaimList: LookupItem[] = Object.values(StatusClaim).map(
  (stat) => {
    return { id: stat, value: stat };
  }
);
