import { createSlice, Dictionary, PayloadAction } from "@reduxjs/toolkit";
import { LookupItem } from "../../models/lookup-item";
import { Farm } from "./farmer-models/farm";
import { Claim } from "./farmer-models/claim";
import { FarmCrop } from "./farmer-models/farm-crop";
import { ErrorMessage } from "../../models/error-message";
import { StatusCrop } from "./farmer-models/status-crop.enum";
import { FarmerProfile } from "./farmer-models/farmer-profile";
// import { StatusCrop } from "./farmer-models/status-crop.enum";

interface FarmerState {
  farms: Farm[];
  claims: Claim[];
  crops: FarmCrop[];
  isLoading: boolean;
  isSaving: boolean;
  error: ErrorMessage[];
  lookups: Dictionary<LookupItem>;
  selectedClaim: Claim;
  reloadTable: boolean;
  profile: FarmerProfile;
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
  profile: null,
};

// REDUCERS
export const farmerSlice = createSlice({
  name: "farms",
  initialState,
  reducers: {
    // LOCAL USED
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
    reset: (state: FarmerState) => {
      state.error = null;
      state.isLoading = false;
      state.isSaving = false;
    },
    onLogout: (state: FarmerState) => {
      state.error = null;
      state.profile = null;
    },

    // SAVING
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
    harvestCropSuccess: (state: FarmerState, action: PayloadAction<number>) => {
      const { crops } = state;
      state.isSaving = false;

      const farmCropId = action.payload;
      const cropIndex = crops.findIndex((x) => x.farmCropId === farmCropId);
      crops[cropIndex].status = StatusCrop.Harvested;

      state.crops = [...crops];
      state.isLoading = false;
    },
    saveFarmCropSuccess: (state: FarmerState) => {
      state.isSaving = false;
      state.reloadTable = true;
    },
    saveFarmSuccess: (state: FarmerState) => {
      state.isSaving = false;
      state.reloadTable = true;
    },

    // FETCHING
    onLoadFarmerProfileSuccess: (
      state: FarmerState,
      action: PayloadAction<FarmerProfile>
    ) => {
      state.isLoading = false;
      state.profile = action.payload;
    },
    loadFarmsSuccess: (state: FarmerState, action: PayloadAction<Farm[]>) => {
      state.isLoading = false;
      state.farms = action.payload;
    },
    loadClaimsSuccess: (state: FarmerState, action: PayloadAction<Claim[]>) => {
      state.isLoading = false;
      state.claims = action.payload;
    },
    loadCropsSuccess: (
      state: FarmerState,
      action: PayloadAction<FarmCrop[]>
    ) => {
      state.isLoading = false;
      state.crops = action.payload;
    },

    // DELETING
    deleteClaimSuccess: (state: FarmerState, action: PayloadAction<number>) => {
      const claimId = action.payload;
      const newSetOfClaim = state.claims.filter((x) => x.claimId !== claimId);

      state.claims = [...newSetOfClaim];
      state.isLoading = false;
    },
    deleteCropSuccess: (state: FarmerState, action: PayloadAction<number>) => {
      const farmCropId = action.payload;
      const newSetOfCrop = state.crops.filter(
        (x) => x.farmCropId !== farmCropId
      );

      state.crops = [...newSetOfCrop];
      state.isLoading = false;
    },
  },
});

export default farmerSlice.reducer;

export const selectClaim = farmerSlice.actions.selectClaim;
