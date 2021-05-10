export enum StatusFarm {
  Pending = "Pending",
  Rejected = "Rejected",
  Approved = "Approved",
}

export const StatusFarmList: string[] = Object.values(StatusFarm);
