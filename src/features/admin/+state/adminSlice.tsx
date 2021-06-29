import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Farm, { PagedFarm } from "../+models/farm";
import { PagedClaim } from "../+models/claim";

import { ErrorMessage } from "../../../models/error-message";
interface AdminState {
  farms: PagedFarm;
  claims: PagedClaim;
  isLoading: boolean;
  isSaving: boolean;
  error: ErrorMessage[];
  reloadTable: boolean;
}

const initialState: AdminState = {
  farms: {
    page: { totalCount: 0 },
    values: [],
  },
  claims: {
    page: { totalCount: 0 },
    values: [],
  },
  error: [],
  isLoading: false,
  isSaving: false,
  reloadTable: false,
};

// REDUCERS
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // LOCAL USE
    error: (state: AdminState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.isSaving = false;
      state.error = action.payload;
    },

    load: (state: AdminState) => {
      state.isLoading = true;
      state.reloadTable = false;
      state.error = null;
    },
    reset: (state: AdminState) => {
      state.error = null;
      state.isLoading = false;
      state.isSaving = false;
    },
    onLogout: (state: AdminState) => {
      state = { ...initialState };
    },
    save: (state: AdminState) => {
      state.isSaving = true;
      state.error = null;
    },
    // SAVING
    validateClaimSuccess: (state: AdminState) => {
      state.isSaving = false;
      state.reloadTable = true;
    },
    validateFarmSuccess: (state: AdminState) => {
      state.isSaving = false;
      state.reloadTable = true;
    },
    // FETCHING

    loadFarmsSuccess: (state: AdminState, action: PayloadAction<PagedFarm>) => {
      state.isLoading = false;
      state.farms = action.payload;
    },
    loadClaimsSuccess: (
      state: AdminState,
      action: PayloadAction<PagedClaim>
    ) => {
      state.isLoading = false;
      state.claims = action.payload;
    },
  },
});

export default adminSlice.reducer;
