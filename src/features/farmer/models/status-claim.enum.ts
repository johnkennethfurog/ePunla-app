export enum StatusClaim {
  Pending = "Pending",
  Claimed = "Claimed",
  Denied = "Denied",
}

export const StatusClaimList: string[] = Object.values(StatusClaim);
