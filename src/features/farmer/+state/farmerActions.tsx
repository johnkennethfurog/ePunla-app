import { AxiosResponse } from "axios";
import { AppThunk } from "../../../app/store";
import {
  clientCommandApiRequest,
  clientQueryApiRequest,
} from "../../../utils/client";
import { farmerSlice } from "./farmerSlice";
import { Claim } from "../+models/claim";
import { FarmCrop } from "../+models/farm-crop";
import { Farm } from "../+models/farm";
import { SearchCrop } from "../+models/search-crop";
import { ImageUploadResponse } from "../../../models/image-upload-response";
import { ClaimSavePayload } from "../+models/claim-save-payload";
import {
  showError,
  showSuccess,
} from "../../../app/+states/messagePromptSlice";
import { ErrorMessage } from "../../../models/error-message";
import moment from "moment";
import { FarmCropSavePayload } from "../+models/farm-crop-save-payload";
import { FarmSavePayload } from "../+models/farm-save-payload";
import { FarmerProfile } from "../+models/farmer-profile";
import { ActionType } from "../../../models/action-type.enum";
import { ActionModule } from "../../../models/action-module.enum";
import { doAction } from "../../../app/+states/commonSlice";
import { StatusFarmer } from "../+models/status-farmer.enum";

const FARMER_MODULE = "/farmer";
const PHOTO_MODULE = "/photo";

const {
  error,
  load,
  save,
  reset,
  onLogout,

  loadFarmsSuccess,
  loadClaimsSuccess,
  loadCropsSuccess,
  onLoadFarmerProfileSuccess,

  uploadPhotoSuccess,
  saveClaimSuccess,
  harvestCropSuccess,
  saveFarmCropSuccess,
  saveFarmSuccess,

  deleteClaimSuccess,
  deleteCropSuccess,
} = farmerSlice.actions;

export const farmerLogout = onLogout;

// FETCHING
export const fetchProfile = (): AppThunk => (dispatch) => {
  dispatch(load());

  clientQueryApiRequest()
    .get(FARMER_MODULE + "/profile")
    .then((response: AxiosResponse<FarmerProfile>) => {
      dispatch(onLoadFarmerProfileSuccess(response.data));
    })
    .catch((err: any) => {
      dispatch(error(err));
      dispatch(showError("Unable to get Farms"));
    });
};

export const fetchFarms =
  (approvedOnly?: boolean): AppThunk =>
  (dispatch, getState) => {
    const state = getState();

    dispatch(load());

    clientQueryApiRequest()
      .get(`${FARMER_MODULE}/farms${approvedOnly ? "?status=approved" : ""}`)
      .then((response: AxiosResponse<Farm[]>) => {
        if (
          state.farmer.profile.status === StatusFarmer.Pending &&
          response.data.length === 0
        ) {
          dispatch(
            doAction({
              data: null,
              actionType: ActionType.CreateFarm,
              actionModule: ActionModule.FarmerFarmsModule,
            })
          );
        }

        dispatch(loadFarmsSuccess(response.data));
      })
      .catch((err: any) => {
        console.log("err", err);

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
      .then(() => {
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
      .then(() => {
        dispatch(saveFarmCropSuccess());
        dispatch(showSuccess("Farm crop saved successfully!"));
        onSaveSuccess();
      })
      .catch((err: any) => {
        dispatch(error(err));
      });
  };

export const saveFarm =
  (farm: FarmSavePayload, onSaveSuccess: () => void): AppThunk =>
  (dispatch) => {
    dispatch(save());

    clientCommandApiRequest()
      .post(FARMER_MODULE + "/farms/save", farm)
      .then(() => {
        dispatch(saveFarmSuccess());
        dispatch(showSuccess("Farm saved successfully!"));
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

export const resetFarmerAction = reset;
