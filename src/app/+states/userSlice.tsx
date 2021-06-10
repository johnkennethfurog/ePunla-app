import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Farmer } from "../../features/farmer/farmer-models/farmer";
import { ErrorMessage } from "../../models/error-message";
import {
  FarmerSigninPayload,
  AdminSigninPayload,
} from "../../models/signin-payload";
import { RootState, AppThunk } from "../store";
import {
  clientCommandApiRequest,
  clientQueryApiRequest,
} from "../../utils/client";
import { AxiosResponse } from "axios";
import { showError } from "./messagePromptSlice";
import { FarmerSignupPayload } from "../../features/farmer/farmer-models/farmer-signup-payload";

const TOKEN = "token";

interface UserState {
  loading: boolean;
  error: ErrorMessage[];
  user: Farmer;
  isLoggedin: boolean;
  isPending: false;
}

const initialState: UserState = {
  loading: false,
  error: [],
  user: null,
  isPending: false,
  isLoggedin: !!localStorage.getItem(TOKEN),
};

const AUTHENTICATION_MODULE = "/Authentication";
const FARMER_MODULE = "/Farmer";

const onUserAuthenticated = (
  state: UserState,
  action: PayloadAction<Farmer>
) => {
  state.loading = false;
  state.user = action.payload;
  state.isLoggedin = true;
};

// REDUCERS
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onSignInSuccess: onUserAuthenticated,
    onSignUpSuccess: onUserAuthenticated,
    onValidateMobileNumberSuccess: (state: UserState) => {
      state.loading = false;
    },
    onLoad: (state: UserState) => {
      state.error = [];
      state.loading = true;
    },
    onLogout: (state: UserState) => {
      state.user = null;
      state.loading = false;
      state.isLoggedin = false;
    },
    onError: (state: UserState, action: PayloadAction<ErrorMessage[]>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// ASYNC ACTIONS
const {
  onSignInSuccess,
  onLoad,
  onError,
  onValidateMobileNumberSuccess,
  onLogout,
} = UserSlice.actions;

export const logout = (): AppThunk => (dispatch) => {
  localStorage.removeItem(TOKEN);
  dispatch(onLogout());
};

export const signIn =
  (
    forAdmin: boolean,
    payload: FarmerSigninPayload | AdminSigninPayload,
    successCallback: () => void
  ): AppThunk =>
  (dispatch) => {
    dispatch(onLoad());

    const url = forAdmin
      ? `${AUTHENTICATION_MODULE}/admin`
      : `${AUTHENTICATION_MODULE}/farmer`;

    clientQueryApiRequest()
      .post(url, payload)
      .then((response: AxiosResponse<{ token: string; user: Farmer }>) => {
        const { data } = response;
        localStorage.setItem(TOKEN, data.token);
        dispatch(onSignInSuccess(data.user));
        successCallback();
      })
      .catch((err: ErrorMessage[]) => {
        const errorMessage = err[0].message || "Sign in failed";
        console.log("errorMessage", errorMessage);

        dispatch(showError(errorMessage));
        dispatch(onError(err));
      });
  };

export const signUp =
  (payload: FarmerSignupPayload, successCallback: () => void): AppThunk =>
  (dispatch) => {
    dispatch(onLoad());

    const url = `${FARMER_MODULE}/register`;

    clientCommandApiRequest()
      .post(url, payload)
      .then((response: AxiosResponse<{ token: string; user: Farmer }>) => {
        const { data } = response;
        localStorage.setItem(TOKEN, data.token);
        dispatch(onSignInSuccess(data.user));
        successCallback();
      })
      .catch((err: ErrorMessage[]) => {
        const errorMessage = err[0].message || "Sign up failed";
        console.log("errorMessage", errorMessage);

        dispatch(showError(errorMessage));
        dispatch(onError(err));
      });
  };

export const validateMobileNumber =
  (mobileNumber: string, callback: () => void): AppThunk =>
  (dispatch) => {
    dispatch(onLoad());

    const url = `${AUTHENTICATION_MODULE}/ValidateMobileNumber/${mobileNumber}`;

    clientQueryApiRequest()
      .get(url)
      .then((response: AxiosResponse) => {
        dispatch(onValidateMobileNumberSuccess());
        callback();
      })
      .catch((err: ErrorMessage[]) => {
        const errorMessage = err[0]?.message || "Validation Failed";

        dispatch(showError(errorMessage));
        dispatch(onError(err));
      });
  };

// SELECTOR
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isLoggedin;

export const selectUserAvatar = (state: RootState) => state.user.user?.avatar;
export const selectUserFullname = (state: RootState) =>
  `${state.user.user?.firstName} ${state.user.user?.lastName}`;
export const selectIsPending = (state: RootState) =>
  state.user?.user?.status === "Pending";

export default UserSlice.reducer;
