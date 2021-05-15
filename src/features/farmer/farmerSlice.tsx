import { createSlice, Dictionary, PayloadAction } from "@reduxjs/toolkit";
import { LookupItem } from "../../models/lookup-item";
import { Farm } from "./farmer-models/farm";
import { Claim } from "./farmer-models/claim";
import { Crop } from "./farmer-models/crop";

interface FarmerState {
  farms: Farm[];
  claims: Claim[];
  crops: Crop[];
  isLoading: boolean;
  error: any;
  lookups: Dictionary<LookupItem>;
}

const initialState: FarmerState = {
  farms: [],
  claims: [],
  crops: [],
  error: null,
  isLoading: false,
  lookups: {},
};

// REDUCERS
export const farmerSlice = createSlice({
  name: "farms",
  initialState,
  reducers: {
    error: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    load: (state) => {
      state.isLoading = true;
      state.error = null;
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
