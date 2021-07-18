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
  AdminExpandCollapsedClaim,
  AdminApproveClaim,
  AdminDeclineClaim,
  AdminViewClaim,

  // ADMIN FARM
  AdminExpandCollapsedFarm,
  AdminApproveFarm,
  AdminDeclineFarm,

  // ADMIN CROP
  AdminUpdateCrops,
  AdminDeleteCrops,
  AdminExpandCollapsedCrops,

  // ADMIN BARANGAY
  AdminUpdateBarangay,
  AdminUpdateStatusBarangay,
  AdminExpandCollapsedBarangay,
}
