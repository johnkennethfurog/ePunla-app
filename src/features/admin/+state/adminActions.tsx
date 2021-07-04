import { AxiosResponse } from "axios";
import { AppThunk } from "../../../app/store";
import {
  clientCommandApiRequest,
  clientQueryApiRequest,
} from "../../../utils/client";
import { adminSlice } from "./adminSlice";
import { PagedClaim } from "../+models/claim";
import Farm, { PagedFarm } from "../+models/farm";
import {
  showError,
  showSuccess,
} from "../../../app/+states/messagePromptSlice";
import { ErrorMessage } from "../../../models/error-message";
import { PagedRequest } from "../../../models/paged-request";
import { ClaimSearchField } from "../+models/claim-search-field";
import { FarmSearchField } from "../+models/farm-search-field";
import { ValidateClaimPayload } from "../+models/validate-claim-payload";
import { ValidateFarmPayload } from "../+models/validate-farm-payload";
import { CropSearchField } from "../+models/crop-search-field";
import { PagedCrop } from "../+models/crop";
import { Category } from "../+models/category";
import { CropSavePayload } from "../+models/crop-save-payload";

const ADMIN_MODULE = "/admin";
const MASTER_LIST_MODULE = "/masterlist";

const {
  error,
  load,
  save,
  reset,
  onLogout,
  validateClaimSuccess,
  validateFarmSuccess,
  saveCropSuccess,

  loadFarmsSuccess,
  loadClaimsSuccess,
  loadCategoriesSuccess,
  loadCropsSuccess,
} = adminSlice.actions;

export const farmerLogout = onLogout;

// SAVING
export const validateClaim =
  (
    claimId: number,
    payload: ValidateClaimPayload,
    onValidateSuccess: () => void
  ): AppThunk =>
  (dispatch) => {
    dispatch(save());

    clientCommandApiRequest()
      .put(`${ADMIN_MODULE}/claims/${claimId}/validate`, payload)
      .then(() => {
        dispatch(validateClaimSuccess());
        onValidateSuccess();
      })
      .catch((err: any) => {
        dispatch(error(err));
        dispatch(showError("Unable to validate Claim"));
      });
  };

export const validateFarm =
  (
    farmId: number,
    payload: ValidateFarmPayload,
    onValidateSuccess: () => void
  ): AppThunk =>
  (dispatch) => {
    dispatch(save());

    clientCommandApiRequest()
      .put(`${ADMIN_MODULE}/farms/${farmId}/validate`, payload)
      .then(() => {
        dispatch(validateFarmSuccess());
        onValidateSuccess();
      })
      .catch((err: any) => {
        dispatch(error(err));
        dispatch(showError("Unable to validate Farm"));
      });
  };

export const saveCrop =
  (payload: CropSavePayload, onSaveSuccess: () => void): AppThunk =>
  (dispatch) => {
    dispatch(save());

    clientCommandApiRequest()
      .post(`${MASTER_LIST_MODULE}/crops/save`, payload)
      .then(() => {
        dispatch(saveCropSuccess());
        dispatch(showSuccess("Crops saved!"));
        onSaveSuccess();
      })
      .catch((err: ErrorMessage[]) => {
        const errorMessage = err[0].message || "Unable to save Crops";
        dispatch(error(err));
        dispatch(showError(errorMessage));
      });
  };

// FETCHING

export const fetchFarms =
  (searchField: PagedRequest<FarmSearchField>): AppThunk =>
  (dispatch, getState) => {
    const state = getState();

    dispatch(load());

    clientQueryApiRequest()
      .post(`${ADMIN_MODULE}/farms`, searchField)
      .then((response: AxiosResponse<PagedFarm>) => {
        dispatch(loadFarmsSuccess(response.data));
      })
      .catch((err: any) => {
        console.log("err", err);

        dispatch(error(err));
        dispatch(showError("Unable to get Farms"));
      });
  };

export const fetchClaims =
  (searchField: PagedRequest<ClaimSearchField>): AppThunk =>
  (dispatch) => {
    dispatch(load());

    clientQueryApiRequest()
      .post(ADMIN_MODULE + "/claims", searchField)
      .then((response: AxiosResponse<PagedClaim>) => {
        dispatch(loadClaimsSuccess(response.data));
      })
      .catch((err: any) => {
        dispatch(error(err));
        dispatch(showError("Unable to get Claims"));
      });
  };

export const fetchCrops =
  (searchField: PagedRequest<CropSearchField>): AppThunk =>
  (dispatch) => {
    dispatch(load());

    clientQueryApiRequest()
      .post(MASTER_LIST_MODULE + "/crops", searchField)
      .then((response: AxiosResponse<PagedCrop>) => {
        dispatch(loadCropsSuccess(response.data));
      })
      .catch((err: any) => {
        dispatch(error(err));
        dispatch(showError("Unable to get Crops"));
      });
  };

export const fetchCategories = (): AppThunk => (dispatch) => {
  dispatch(load());

  clientQueryApiRequest()
    .get(MASTER_LIST_MODULE + "/categories")
    .then((response: AxiosResponse<Category[]>) => {
      dispatch(loadCategoriesSuccess(response.data));
    })
    .catch((err: any) => {
      dispatch(error(err));
      dispatch(showError("Unable to get Crop Categories"));
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

export const resetAdminAction = reset;
