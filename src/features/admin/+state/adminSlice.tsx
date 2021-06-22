import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Farm from "../+models/farm";
import Claim from "../+models/claim";

import { ErrorMessage } from "../../../models/error-message";
interface AdminState {
  farms: Farm[];
  claims: Claim[];
  isLoading: boolean;
  isSaving: boolean;
  error: ErrorMessage[];
  reloadTable: boolean;
}

const initialState: AdminState = {
  farms: [],
  claims: [],
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

    // SAVING
    save: (state: AdminState) => {
      state.isSaving = true;
      state.error = null;
    },
    // FETCHING

    loadFarmsSuccess: (state: AdminState, action: PayloadAction<Farm[]>) => {
      state.isLoading = false;
      state.farms = action.payload;
    },
    loadClaimsSuccess: (state: AdminState, action: PayloadAction<Claim[]>) => {
      state.isLoading = false;
      state.claims = action.payload;
    },
  },
});

export default adminSlice.reducer;
