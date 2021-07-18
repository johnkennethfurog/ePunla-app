import { createSlice, Dictionary, PayloadAction } from "@reduxjs/toolkit";
import { LookupItem } from "../../../models/lookup-item";
import { Farm } from "../+models/farm";
import { Claim } from "../+models/claim";
import { FarmCrop } from "../+models/farm-crop";
import { ErrorMessage } from "../../../models/error-message";
import { StatusCrop } from "../+models/status-crop.enum";
import { FarmerProfile } from "../+models/farmer-profile";
import moment from "moment";

interface FarmerState {
  farms: Farm[];
  claims: Claim[];
  crops: FarmCrop[];
  cropsToHarvest: FarmCrop[];
  isLoading: boolean;
  isSaving: boolean;
  error: ErrorMessage[];
  lookups: Dictionary<LookupItem>;
  selectedClaim: Claim;
  reloadData: boolean;
  profile: FarmerProfile;
}

const initialState: FarmerState = {
  farms: [],
  claims: [],
  crops: [],
  cropsToHarvest: [],
  error: [],
  isLoading: false,
  isSaving: false,
  reloadData: false,
  lookups: {},
  selectedClaim: null,
  profile: null,
};

// REDUCERS
export const farmerSlice = createSlice({
  name: "farms",
  initialState,
  reducers: {
    // LOCAL USE
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
      state.reloadData = false;
      state.error = null;
    },
    reset: (state: FarmerState) => {
      state.error = null;
      state.isLoading = false;
      state.isSaving = false;
    },
    onLogout: (state: FarmerState) => {
      state = { ...initialState };
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
      state.reloadData = true;
    },
    harvestCropSuccess: (state: FarmerState, action: PayloadAction<number>) => {
      const { crops, cropsToHarvest } = state;
      state.isSaving = false;

      const farmCropId = action.payload;
      const cropIndex = crops.findIndex((x) => x.farmCropId === farmCropId);
      const updatedCropsToHarvest = cropsToHarvest.filter(
        (x) => x.farmCropId !== farmCropId
      );
      crops[cropIndex].status = StatusCrop.Harvested;

      state.crops = [...crops];
      state.isLoading = false;
      state.cropsToHarvest = updatedCropsToHarvest;
    },
    saveFarmCropSuccess: (state: FarmerState) => {
      state.isSaving = false;
      state.reloadData = true;
    },
    saveFarmSuccess: (state: FarmerState) => {
      state.isSaving = false;
      state.reloadData = true;
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
      const { payload } = action;
      const cropForHarvest = payload.filter(
        (x) =>
          x.status === StatusCrop.Planted &&
          !!moment(x.estimatedHarvestDate).isBefore()
      );

      state.isLoading = false;
      state.crops = payload;
      state.cropsToHarvest = cropForHarvest;
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
