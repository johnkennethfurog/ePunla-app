import { AxiosResponse } from "axios";
import { AppThunk } from "../../app/store";
import {
  clientCommandApiRequest,
  clientQueryApiRequest,
} from "../../utils/client";
import { farmerSlice } from "./farmerSlice";
import { Claim } from "./farmer-models/claim";
import { FarmCrop } from "./farmer-models/farm-crop";
import { Farm } from "./farmer-models/farm";
import { SearchCrop } from "./farmer-models/search-crop";
import { ImageUploadResponse } from "../../models/image-upload-response";
import { ClaimSavePayload } from "./farmer-models/claim-save-payload";
import { showError, showSuccess } from "../../app/messagePromptSlice";
import { ErrorMessage } from "../../models/error-message";
import moment from "moment";
import { FarmCropSavePayload } from "./farmer-models/farm-crop-save-payload";

const FARMER_MODULE = "/farmer";
const PHOTO_MODULE = "/photo";

const {
  error,
  load,
  save,

  loadFarmsSuccess,
  loadClaimsSuccess,
  loadCropsSuccess,

  uploadPhotoSuccess,
  saveClaimSuccess,
  harvestCropSuccess,
  saveFarmCropSuccess,

  deleteClaimSuccess,
  deleteCropSuccess,
} = farmerSlice.actions;

// FETCHING
export const fetchFarms = (): AppThunk => (dispatch) => {
  dispatch(load());

  clientQueryApiRequest()
    .get(FARMER_MODULE + "/farms")
    .then((response: AxiosResponse<Farm[]>) => {
      dispatch(loadFarmsSuccess(response.data));
    })
    .catch((err: any) => {
      dispatch(error(err));
      dispatch(showError("Unable to get Farms"));
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
        dispatch(showError("Unable to get Claims"));
      });
  };

export const fetchCrops =
  (search: SearchCrop): AppThunk =>
  (dispatch) => {
    dispatch(load());

    clientQueryApiRequest()
      .post(FARMER_MODULE + "/crops/search", { ...search })
      .then((response: AxiosResponse<FarmCrop[]>) => {
        dispatch(loadCropsSuccess(response.data));
      })
      .catch((err: any) => {
        dispatch(error(err));
        dispatch(showError("Unable to get Crops"));
      });
  };

// SAVING OR UPDATING
export const uploadPhoto =
  (file: File, callBack: (img: ImageUploadResponse) => void): AppThunk =>
  (dispatch) => {
    dispatch(save());

    const data = new FormData();
    data.append("file", file);

    clientCommandApiRequest()
      .post(PHOTO_MODULE + "/upload", data)
      .then((response: AxiosResponse<ImageUploadResponse>) => {
        dispatch(uploadPhotoSuccess());
        callBack(response.data);
      })
      .catch((err: any) => {
        dispatch(error(err));
        dispatch(showError("Unable to upload Photo"));
      });
  };

export const saveClaim =
  (claim: ClaimSavePayload, onSaveSuccess: () => void): AppThunk =>
  (dispatch) => {
    dispatch(save());

    clientCommandApiRequest()
      .post(FARMER_MODULE + "/claims/save", claim)
      .then((response: AxiosResponse) => {
        dispatch(saveClaimSuccess());
        dispatch(showSuccess("Claims saved successfully!"));
        onSaveSuccess();
      })
      .catch((err: any) => {
        dispatch(error(err));
      });
  };

export const harvestCrop =
  (
    farmCropId: number,
    harvestDate: moment.Moment,
    onHarvestSuccess: () => void
  ): AppThunk =>
  (dispatch) => {
    dispatch(save());

    clientCommandApiRequest()
      .put(`${FARMER_MODULE}/crops/${farmCropId}/harvest`, {
        harvestDate,
      })
      .then(() => {
        dispatch(harvestCropSuccess(farmCropId));
        dispatch(showSuccess("Crops Harvested!"));
        onHarvestSuccess();
      })
      .catch((err: ErrorMessage[]) => {
        const errorMessage = err[0].message || "Unable to delete Crops";
        dispatch(error(err));
        dispatch(showError(errorMessage));
      });
  };

export const saveFarmCrop =
  (farmCrop: FarmCropSavePayload, onSaveSuccess: () => void): AppThunk =>
  (dispatch) => {
    dispatch(save());

    clientCommandApiRequest()
      .post(FARMER_MODULE + "/crops/save", farmCrop)
      .then((response: AxiosResponse) => {
        dispatch(saveFarmCropSuccess());
        dispatch(showSuccess("Farm crop saved successfully!"));
        onSaveSuccess();
      })
      .catch((err: any) => {
        dispatch(error(err));
      });
  };

// LOCAL USED
export const addValidationError =
  (errorMessage: string): AppThunk =>
  (dispatch) => {
    const err: ErrorMessage = { message: errorMessage };

    dispatch(error([err]));
  };

// DELETING
export const deleteClaim =
  (claimId: number): AppThunk =>
  (dispatch) => {
    dispatch(load());

    clientCommandApiRequest()
      .delete(FARMER_MODULE + "/claims/" + claimId)
      .then(() => {
        dispatch(deleteClaimSuccess(claimId));
        dispatch(showSuccess("Claims Deleted!"));
      })
      .catch((err: any) => {
        dispatch(error(err));
        dispatch(showError("Unable to delete Claim"));
      });
  };

export const deleteCrop =
  (farmCropId: number): AppThunk =>
  (dispatch) => {
    dispatch(load());

    clientCommandApiRequest()
      .delete(FARMER_MODULE + "/crops/" + farmCropId)
      .then(() => {
        dispatch(deleteCropSuccess(farmCropId));
        dispatch(showSuccess("Crops Deleted!"));
      })
      .catch((err: ErrorMessage[]) => {
        const errorMessage = err[0].message || "Unable to delete Crops";
        dispatch(error(err));
        dispatch(showError(errorMessage));
      });
  };
