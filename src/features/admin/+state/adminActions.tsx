import { AxiosResponse } from "axios";
import { AppThunk } from "../../../app/store";
import {
  clientCommandApiRequest,
  clientQueryApiRequest,
} from "../../../utils/client";
import { adminSlice } from "./adminSlice";
import Claim from "../+models/claim";
import Farm from "../+models/farm";
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

const ADMIN_MODULE = "/admin";

const {
  error,
  load,
  save,
  reset,
  onLogout,

  loadFarmsSuccess,
  loadClaimsSuccess,
} = adminSlice.actions;

export const farmerLogout = onLogout;

// FETCHING

export const fetchFarms =
  (searchField: PagedRequest<FarmSearchField>): AppThunk =>
  (dispatch, getState) => {
    const state = getState();

    dispatch(load());

    clientQueryApiRequest()
      .post(`${ADMIN_MODULE}/farms`, searchField)
      .then((response: AxiosResponse<Farm[]>) => {
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
      .then((response: AxiosResponse<Claim[]>) => {
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
