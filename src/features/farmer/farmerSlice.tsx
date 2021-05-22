import { createSlice, Dictionary, PayloadAction } from "@reduxjs/toolkit";
import { LookupItem } from "../../models/lookup-item";
import { Farm } from "./farmer-models/farm";
import { Claim } from "./farmer-models/claim";
import { Crop } from "./farmer-models/crop";
import { ErrorMessage } from "../../models/error-message";

interface FarmerState {
  farms: Farm[];
  claims: Claim[];
  crops: Crop[];
  isLoading: boolean;
  isSaving: boolean;
  error: ErrorMessage[];
  lookups: Dictionary<LookupItem>;
  selectedClaim: Claim;
  reloadTable: boolean;
}

const initialState: FarmerState = {
  farms: [],
  claims: [],
  crops: [],
  error: [],
  isLoading: false,
  isSaving: false,
  reloadTable: false,
  lookups: {},
  selectedClaim: null,
};

// REDUCERS
export const farmerSlice = createSlice({
  name: "farms",
  initialState,
  reducers: {
    error: (state: FarmerState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.isSaving = false;
      state.error = action.payload;
    },

    selectClaim: (state: FarmerState, action: PayloadAction<Claim>) => {
      state.selectedClaim = action.payload;
    },
    load: (state: FarmerState) => {
      state.isLoading = true;
      state.reloadTable = false;
      state.error = null;
    },

    uploadPhotoSuccess: (state: FarmerState) => {
      state.isSaving = false;
    },
    save: (state: FarmerState) => {
      state.isSaving = true;
      state.error = null;
    },
    saveClaimSuccess: (state: FarmerState) => {
      state.isSaving = false;
      state.reloadTable = true;
    },

    loadFarmsSuccess: (state: FarmerState, action: PayloadAction<Farm[]>) => {
      state.isLoading = false;
      state.farms = action.payload;
    },
    loadClaimsSuccess: (state: FarmerState, action: PayloadAction<Claim[]>) => {
      state.isLoading = false;
      state.claims = action.payload;
    },
    loadCropsSuccess: (state: FarmerState, action: PayloadAction<Crop[]>) => {
      state.isLoading = false;
      state.crops = action.payload;
    },

    deleteClaimSuccess: (state: FarmerState, action: PayloadAction<number>) => {
      const claimId = action.payload;
      const newSetOfClaim = state.claims.filter((x) => x.claimId !== claimId);

      state.claims = [...newSetOfClaim];
      state.isLoading = false;
    },
  },
});

export default farmerSlice.reducer;

export const selectClaim = farmerSlice.actions.selectClaim;
