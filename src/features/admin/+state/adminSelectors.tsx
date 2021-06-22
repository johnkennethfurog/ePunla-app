import { RootState } from "../../../app/store";
// SELECTOR
export const selectFarms = (state: RootState) => state.admin.farms;

export const selectClaims = (state: RootState) => state.admin.claims;

export const selectError = (state: RootState) =>
  state.admin.error?.map((err) => err.message) || [];
export const selectIsLoading = (state: RootState) => state.admin.isLoading;
export const selectIsSaving = (state: RootState) => state.admin.isSaving;
export const selectReloadTable = (state: RootState) => state.admin.reloadTable;
