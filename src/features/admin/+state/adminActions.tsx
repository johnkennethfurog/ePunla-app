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
import moment from "moment";
import { ActionType } from "../../../models/action-type.enum";
import { ActionModule } from "../../../models/action-module.enum";
import { doAction } from "../../../app/+states/commonSlice";
import { PagedRequest } from "../../../models/paged-request";
import { ClaimSearchField } from "../+models/claim-search-field";
import { FarmSearchField } from "../+models/farm-search-field";
import { ValidateClaimPayload } from "../+models/validate-claim-payload";
import { ValidateFarmPayload } from "../+models/validate-farm-payload";

const ADMIN_MODULE = "/admin";

const {
  error,
  load,
  save,
  reset,
  onLogout,
  validateClaimSuccess,
  validateFarmSuccess,

  loadFarmsSuccess,
  loadClaimsSuccess,
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

// LOCAL USED
export const addValidationError =
  (errorMessage: string): AppThunk =>
  (dispatch) => {
    const err: ErrorMessage = { message: errorMessage };

    dispatch(error([err]));
  };

// DELETING

export const resetAdminAction = reset;
