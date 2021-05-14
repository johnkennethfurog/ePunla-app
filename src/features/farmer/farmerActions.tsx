import { AxiosResponse } from "axios";
import { AppThunk } from "../../app/store";
import {
  clientCommandApiRequest,
  clientQueryApiRequest,
} from "../../utils/client";
import { farmerSlice } from "./farmerSlice";
import { Claim } from "./models/claim";
import { Crop } from "./models/crop";
import { Farm } from "./models/farm";
import { SearchCrop } from "./models/search-crop";

const FARMER_MODULE = "/farmer";

const {
  error,
  load,
  loadFarmsSuccess,
  loadClaimsSuccess,
  loadCropsSuccess,
  deleteClaimSuccess,
} = farmerSlice.actions;

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

export const fetchClaims =
  (status: string): AppThunk =>
  (dispatch) => {
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

export const deleteClaim =
  (claimId: number): AppThunk =>
  (dispatch) => {
    dispatch(load());

    clientCommandApiRequest()
      .delete(FARMER_MODULE + "/claims/" + claimId)
      .then(() => {
        dispatch(deleteClaimSuccess(claimId));
      })
      .catch((err: any) => {
        dispatch(error(err));
      });
  };

export const fetchCrops =
  (search: SearchCrop): AppThunk =>
  (dispatch) => {
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
