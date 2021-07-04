import { RootState } from "../../../app/store";
// SELECTOR

export const selectClaims = (state: RootState) => state.admin.claims.values;
export const selectClaimsPageCount = (state: RootState) =>
  state.admin.claims.page.totalCount;

export const selectFarms = (state: RootState) => state.admin.farms.values;
export const selectFarmsPageCount = (state: RootState) =>
  state.admin.farms.page.totalCount;

export const selectCrops = (state: RootState) => state.admin.crops.values;
export const selectCropsPageCount = (state: RootState) =>
  state.admin.crops.page.totalCount;

export const selectError = (state: RootState) =>
  state.admin.error?.map((err) => err.message) || [];
export const selectIsLoading = (state: RootState) => state.admin.isLoading;
export const selectAdminIsSaving = (state: RootState) => state.admin.isSaving;
export const selectReloadTable = (state: RootState) => state.admin.reloadTable;
export const selectCategories = (state: RootState) => state.admin.categories;
