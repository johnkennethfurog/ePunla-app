import { RootState } from "../../../app/store";
import { StatusFarmer } from "../../../models/status-farmer.enum";

// SELECTOR
export const selectFarms = (state: RootState) => state.farmer.farms;

export const selectClaims = (state: RootState) => state.farmer.claims;
export const selectSelectedClaim = (state: RootState) =>
  state.farmer.selectedClaim;

export const selectCrops = (state: RootState) => state.farmer.crops;
export const selectCropsToHarvest = (state: RootState) =>
  state.farmer.cropsToHarvest;

export const selectError = (state: RootState) =>
  state.farmer.error?.map((err) => err.message) || [];
export const selectIsLoading = (state: RootState) => state.farmer.isLoading;
export const selectIsSaving = (state: RootState) => state.farmer.isSaving;
export const selectreloadData = (state: RootState) => state.farmer.reloadData;

export const selectProfile = (state: RootState) => state.farmer.profile;
export const selectFarmerAvatar = (state: RootState) =>
  state.farmer.profile?.avatar;
export const selectFarmerFullname = (state: RootState) =>
  `${state.farmer.profile?.firstName} ${state.farmer.profile?.lastName}`;
export const selectIsPending = (state: RootState) =>
  state.farmer?.profile?.status === StatusFarmer.Pending;
