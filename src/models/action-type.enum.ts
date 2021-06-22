export enum ActionType {
  None,
  // CROPS
  UpdateCrops,
  DeleteCrops,
  HarvestCrops,
  ExpandCollapsedCrops,
  // FARM
  UpdateFarm,
  DeleteFarm,
  CreateFarm,
  ExpandCollapsedFarm,

  // ADMIN CLAIM
  AdminExpandCollapsedCrops,
  AdminApproveClaim,
  AdminDeclineClaim,

  // ADMIN FARM
  AdminExpandCollapsedFarm,
  AdminApproveFarm,
  AdminDeclineFarm,
}
