import { RootState } from "../../app/store";

// SELECTOR
export const selectFarms = (state: RootState) => state.farmer.farms;

export const selectClaims = (state: RootState) => state.farmer.claims;

export const selectCrops = (state: RootState) => state.farmer.crops;

export const selectError = (state: RootState) => state.farmer.error;
export const selectIsLoading = (state: RootState) => state.farmer.isLoading;
