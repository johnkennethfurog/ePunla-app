import { AxiosResponse } from "axios";
import { AppThunk } from "../../../app/store";
import {
  clientCommandApiRequest,
  clientQueryApiRequest,
} from "../../../utils/client";
import { adminSlice } from "./adminSlice";
import Claim, { PagedClaim } from "../+models/claim";
import { PagedFarm } from "../+models/farm";
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
import { BarangaySavePayload } from "../+models/barangay-save-payload";
import { BarangayStatusPayload } from "../+models/barangay-status-payload";
import { ClaimDetail } from "../+models/claim-detail";
import { DashboardStatistic } from "../+models/dashboard-statistic";

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
  setClaimForVerificationSuccess,
  saveCropSuccess,
  saveBarangaySuccess,
  saveBarangayStatusSuccess,

  loadFarmsSuccess,
  loadClaimsSuccess,
  loadClaimDetailSuccess,
  loadCategoriesSuccess,
  loadCropsSuccess,

  loadDashboardDAta,
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

    clientCommandApiRequest({ forAdmin: true })
      .put(`${ADMIN_MODULE}/claims/${claimId}/validate`, payload)
      .then(() => {
        dispatch(validateClaimSuccess({ isApproved: payload.isApproved }));
        onValidateSuccess();
      })
      .catch((err: ErrorMessage[]) => {
        const errorMessage = err[0]?.message || "Unable to validate Claim";

        dispatch(error(err));
        dispatch(showError(errorMessage));
      });
  };

export const setClaimForVerification =
  (claimId: number): AppThunk =>
  (dispatch) => {
    dispatch(save());

    clientCommandApiRequest({ forAdmin: true })
      .put(`${ADMIN_MODULE}/claims/${claimId}/setforverification`)
      .then(() => {
        dispatch(setClaimForVerificationSuccess());
      })
      .catch((err: ErrorMessage[]) => {
        const errorMessage =
          err[0]?.message || "Unable set claim for verification";

        dispatch(error(err));
        dispatch(showError(errorMessage));
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

    clientCommandApiRequest({ forAdmin: true })
      .put(`${ADMIN_MODULE}/farms/${farmId}/validate`, payload)
      .then(() => {
        dispatch(validateFarmSuccess());
        onValidateSuccess();
      })
      .catch((err: ErrorMessage[]) => {
        const errorMessage = err[0]?.message || "Unable to validate Farm";

        dispatch(error(err));
        dispatch(showError(errorMessage));
      });
  };

export const saveCrop =
  (payload: CropSavePayload, onSaveSuccess: () => void): AppThunk =>
  (dispatch) => {
    dispatch(save());

    clientCommandApiRequest({ forAdmin: true })
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

export const saveBarangay =
  (payload: BarangaySavePayload, onSaveSuccess: () => void): AppThunk =>
  (dispatch) => {
    dispatch(save());

    clientCommandApiRequest({ forAdmin: true })
      .post(`${MASTER_LIST_MODULE}/barangays/save`, payload)
      .then(() => {
        dispatch(saveBarangaySuccess());
        dispatch(showSuccess("Barangay saved!"));
        onSaveSuccess();
      })
      .catch((err: ErrorMessage[]) => {
        const errorMessage = err[0]?.message || "Unable to save Barangay";
        // dispatch(error(err));
        dispatch(showError(errorMessage));
      });
  };

export const updateBarangayStatus =
  (barangayId: number, payload: BarangayStatusPayload): AppThunk =>
  (dispatch) => {
    dispatch(save());

    clientCommandApiRequest({ forAdmin: true })
      .put(
        `${MASTER_LIST_MODULE}/barangays/${barangayId}/changeStatus`,
        payload
      )
      .then(() => {
        dispatch(saveBarangayStatusSuccess());
      })
      .catch((err: any) => {
        dispatch(error(err));
        dispatch(showError("Unable to update Barangay Status"));
      });
  };

// FETCHING

export const fetchFarms =
  (searchField: PagedRequest<FarmSearchField>): AppThunk =>
  (dispatch, getState) => {
    const state = getState();

    dispatch(load());

    clientQueryApiRequest({ forAdmin: true })
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

    clientQueryApiRequest({ forAdmin: true })
      .post(ADMIN_MODULE + "/claims", searchField)
      .then((response: AxiosResponse<PagedClaim>) => {
        dispatch(loadClaimsSuccess(response.data));
      })
      .catch((err: any) => {
        dispatch(error(err));
        dispatch(showError("Unable to get Claims"));
      });
  };

export const fetchClaimDetail =
  (claimId: number): AppThunk =>
  (dispatch) => {
    dispatch(load());

    clientQueryApiRequest({ forAdmin: true })
      .get(`${ADMIN_MODULE}/claims/${claimId}`)
      .then((response: AxiosResponse<ClaimDetail>) => {
        dispatch(loadClaimDetailSuccess(response.data));
      })
      .catch((err: any) => {
        dispatch(error(err));
        dispatch(showError("Unable to get Claim Detail"));
      });
  };

export const fetchCrops =
  (searchField: PagedRequest<CropSearchField>): AppThunk =>
  (dispatch) => {
    dispatch(load());

    clientQueryApiRequest({ forAdmin: true })
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

  clientQueryApiRequest({ forAdmin: true })
    .get(MASTER_LIST_MODULE + "/categories")
    .then((response: AxiosResponse<Category[]>) => {
      dispatch(loadCategoriesSuccess(response.data));
    })
    .catch((err: any) => {
      dispatch(error(err));
      dispatch(showError("Unable to get Crop Categories"));
    });
};

export const fetchDashboardData = (): AppThunk => (dispatch) => {
  dispatch(load());

  clientQueryApiRequest({ forAdmin: true })
    .get("/admin/dashboard")
    .then((response: AxiosResponse<DashboardStatistic>) => {
      dispatch(loadDashboardDAta(response.data));
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
export const loadAdminAction = load;
