import { AxiosResponse } from "axios";
import { AppThunk } from "../../app/store";
import {
  clientCommandApiRequest,
  clientQueryApiRequest,
} from "../../utils/client";
import { farmerSlice } from "./farmerSlice";
import { Claim } from "./farmer-models/claim";
import { Crop } from "./farmer-models/crop";
import { Farm } from "./farmer-models/farm";
import { SearchCrop } from "./farmer-models/search-crop";
import { ImageUploadResponse } from "../../models/image-upload-response";
import { ClaimSavePayload } from "./farmer-models/claim-save-payload";

const FARMER_MODULE = "/farmer";
const PHOTO_MODULE = "/photo";

const {
  error,
  load,
  save,
  loadFarmsSuccess,
  loadClaimsSuccess,
  loadCropsSuccess,
  deleteClaimSuccess,
  uploadPhotoSuccess,
  saveClaimSuccess,
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

export const uploadPhoto =
  (file: File, callBack: (img: ImageUploadResponse) => void): AppThunk =>
  (dispatch) => {
    dispatch(load());

    const data = new FormData();
    data.append("file", file);

    clientCommandApiRequest()
      .post(PHOTO_MODULE + "/upload", data, {})
      .then((response: AxiosResponse<ImageUploadResponse>) => {
        dispatch(uploadPhotoSuccess());
        callBack(response.data);
      })
      .catch((err: any) => {
        dispatch(error(err));
      });
  };

export const saveClaim =
  (claim: ClaimSavePayload, onSaveSuccess: () => void): AppThunk =>
  (dispatch) => {
    dispatch(save());

    clientCommandApiRequest()
      .post(FARMER_MODULE + "/claims/save", claim, {})
      .then((response: AxiosResponse<ImageUploadResponse>) => {
        dispatch(saveClaimSuccess());
      })
      .catch((err: any) => {
        dispatch(error(err));
      });
  };
