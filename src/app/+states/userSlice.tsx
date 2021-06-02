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

interface UserState {
  loading: boolean;
  error: ErrorMessage[];
  user: Farmer;
}

const initialState: UserState = {
  loading: false,
  error: [],
  user: null,
};

const AUTHENTICATION_MODULE = "/Authentication";

// REDUCERS
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onSignInSuccess: (state: UserState, action: PayloadAction<Farmer>) => {
      state.loading = false;
      state.user = action.payload;
    },
    onLoad: (state: UserState) => {
      state.error = [];
      state.loading = true;
    },
    onError: (state: UserState, action: PayloadAction<ErrorMessage[]>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// ASYNC ACTIONS
const { onSignInSuccess, onLoad, onError } = UserSlice.actions;

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
        localStorage.setItem("token", data.token);
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

// SELECTOR
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

export default UserSlice.reducer;
