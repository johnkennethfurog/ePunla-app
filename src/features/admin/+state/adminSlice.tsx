import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Farm, { PagedFarm } from "../+models/farm";
import { PagedClaim } from "../+models/claim";

import { ErrorMessage } from "../../../models/error-message";
import { Category } from "../+models/category";
import { PagedCrop } from "../+models/crop";
interface AdminState {
  farms: PagedFarm;
  claims: PagedClaim;
  crops: PagedCrop;
  isLoading: boolean;
  isSaving: boolean;
  error: ErrorMessage[];
  categories: Category[];
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
  crops: {
    page: { totalCount: 0 },
    values: [],
  },
  categories: [],
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
    saveCropSuccess: (state: AdminState) => {
      state.isSaving = false;
      state.reloadTable = true;
    },
    saveBarangaySuccess: (state: AdminState) => {
      state.isSaving = false;
      state.reloadTable = true;
    },
    saveBarangayStatusSuccess: (state: AdminState) => {
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
    loadCropsSuccess: (state: AdminState, action: PayloadAction<PagedCrop>) => {
      state.isLoading = false;
      state.crops = action.payload;
    },
    loadCategoriesSuccess: (
      state: AdminState,
      action: PayloadAction<Category[]>
    ) => {
      state.isLoading = false;
      state.categories = action.payload;
    },
  },
});

export default adminSlice.reducer;
