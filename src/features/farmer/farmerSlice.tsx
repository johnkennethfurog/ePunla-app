import { createSlice, Dictionary, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, RootState } from "../../app/store";
import { Farmer } from "./models/farmer";
import { LookupItem } from "../../models/lookup-item";
import {
  clientCommandApiRequest,
  clientQueryApiRequest,
} from "../../utils/client";
import { Farm } from "./models/farm";
import { Claim } from "./models/claim";
import { Crop } from "./models/crop";
import { SearchCrop } from "./models/search-crop";

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

const FARMER_MODULE = "/farmer";

// REDUCERS
const FarmerSlice = createSlice({
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
  },
});

const {
  error,
  load,
  loadFarmsSuccess,
  loadClaimsSuccess,
  loadCropsSuccess,
} = FarmerSlice.actions;

// ASYNC ACTION
export const fetchFarms = (): AppThunk => (dispatch) => {
  dispatch(load());

  clientQueryApiRequest()
    .get(FARMER_MODULE + "/farms")
    .then((response: AxiosResponse<Farm[]>) => {
      dispatch(loadFarmsSuccess(response.data));
    })
    .catch((err: any) => {
      dispatch(error(err));
    });
};

export const fetchClaims = (status: string): AppThunk => (dispatch) => {
  dispatch(load());

  clientQueryApiRequest()
    .post(FARMER_MODULE + "/claims/search", { status })
    .then((response: AxiosResponse<Claim[]>) => {
      dispatch(loadClaimsSuccess(response.data));
    })
    .catch((err: any) => {
      dispatch(error(err));
    });
};

export const fetchCrops = (search: SearchCrop): AppThunk => (dispatch) => {
  dispatch(load());

  clientQueryApiRequest()
    .post(FARMER_MODULE + "/crops/search", { ...search })
    .then((response: AxiosResponse<Crop[]>) => {
      dispatch(loadCropsSuccess(response.data));
    })
    .catch((err: any) => {
      dispatch(error(err));
    });
};

// SELECTOR
export const selectFarms = (state: RootState) => state.farmer.farms;

export const selectClaims = (state: RootState) => state.farmer.claims;

export const selectCrops = (state: RootState) => state.farmer.crops;

export const selectError = (state: RootState) => state.farmer.error;
export const selectIsLoading = (state: RootState) => state.farmer.isLoading;

export default FarmerSlice.reducer;
