import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Farm, { PagedFarm } from "../+models/farm";
import Claim, { PagedClaim } from "../+models/claim";

import { ErrorMessage } from "../../../models/error-message";
import { Category } from "../+models/category";
import { PagedCrop } from "../+models/crop";
import { ClaimDetail } from "../+models/claim-detail";
import { StatusClaim } from "../../../models/status-claim.enum";
import { DashboardStatistic } from "../+models/dashboard-statistic";
import { CropOccurance } from "../+models/crop-occurance";
import { UserProfile } from "../+models/user-profile";
interface AdminState {
  farms: PagedFarm;
  claims: PagedClaim;
  crops: PagedCrop;
  isLoading: boolean;
  isSaving: boolean;
  error: ErrorMessage[];
  categories: Category[];
  reloadData: boolean;
  claimDetail?: ClaimDetail;
  cropOccurance: CropOccurance[];

  dashboardStatistic?: DashboardStatistic;
  profile?: UserProfile;
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
  cropOccurance: [],
  isLoading: false,
  isSaving: false,
  reloadData: false,
  profile: undefined,
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
      state.reloadData = false;
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
    setClaimForVerificationSuccess: (state: AdminState) => {
      state.isSaving = false;
      state.claimDetail.status = StatusClaim.ForVerification;
    },
    setClaimAsClaimedSuccess: (state: AdminState) => {
      state.isSaving = false;
      state.claimDetail.status = StatusClaim.Claimed;
    },
    validateClaimSuccess: (
      state: AdminState,
      action: PayloadAction<{ isApproved: boolean }>
    ) => {
      const { isApproved } = action.payload;

      state.isSaving = false;
      state.claimDetail.status = isApproved
        ? StatusClaim.Approved
        : StatusClaim.Denied;
    },
    validateFarmSuccess: (state: AdminState) => {
      state.isSaving = false;
      state.reloadData = true;
    },
    saveCropSuccess: (state: AdminState) => {
      state.isSaving = false;
      state.reloadData = true;
    },
    saveBarangaySuccess: (state: AdminState) => {
      state.isSaving = false;
      state.reloadData = true;
    },
    saveBarangayStatusSuccess: (state: AdminState) => {
      state.isSaving = false;
      state.reloadData = true;
    },
    // FETCHING
    loadProfileSuccess: (
      state: AdminState,
      action: PayloadAction<UserProfile>
    ) => {
      state.profile = action.payload;
    },
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

    loadClaimDetailSuccess: (
      state: AdminState,
      action: PayloadAction<ClaimDetail>
    ) => {
      state.isLoading = false;
      state.claimDetail = action.payload;
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
    loadDashboardDAta: (
      state: AdminState,
      action: PayloadAction<DashboardStatistic>
    ) => {
      state.isLoading = false;
      state.dashboardStatistic = action.payload;
    },
    loadCropOccuranceSuccess: (
      state: AdminState,
      action: PayloadAction<CropOccurance[]>
    ) => {
      state.isLoading = false;
      state.cropOccurance = action.payload;
    },
  },
});

export default adminSlice.reducer;
