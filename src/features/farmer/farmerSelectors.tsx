import { RootState } from "../../app/store";

// SELECTOR
export const selectFarms = (state: RootState) => state.farmer.farms;

export const selectClaims = (state: RootState) => state.farmer.claims;
export const selectSelectedClaim = (state: RootState) =>
  state.farmer.selectedClaim;

export const selectCrops = (state: RootState) => state.farmer.crops;

export const selectError = (state: RootState) =>
  state.farmer.error?.map((err) => err.message) || [];
export const selectIsLoading = (state: RootState) => state.farmer.isLoading;
export const selectIsSaving = (state: RootState) => state.farmer.isSaving;
export const selectReloadTable = (state: RootState) => state.farmer.reloadTable;

export const selectFarmerAvatar = (state: RootState) =>
  state.farmer.profile?.avatar;
export const selectFarmerFullname = (state: RootState) =>
  `${state.farmer.profile?.firstName} ${state.farmer.profile?.lastName}`;
export const selectIsPending = (state: RootState) =>
  state.farmer?.profile?.status === "Pending";
