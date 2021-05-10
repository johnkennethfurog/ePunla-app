import { createSlice, Dictionary, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { LookupItem } from "../models/lookup-item";
import { LookupItemResponse } from "../models/lookup-item-response";
import { LookupType } from "../models/lookup-type.enum";
import { clientQueryApiRequest } from "../utils/client";
import { AppThunk, RootState } from "./store";

interface CommonState {
  lookups: Dictionary<LookupItem[]>;
  error: any;
  isLoading: boolean;
}

const initialState: CommonState = {
  lookups: {},
  error: null,
  isLoading: false,
};

// REDUCERS
const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    loadLookupSuccess: (
      state: CommonState,
      action: PayloadAction<LookupItemResponse[]>
    ) => {
      action.payload.forEach((lookup) => {
        state.lookups[lookup.lookupType] = lookup.lookupItems;
      });
    },
    onError: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    noAction: () => {},
  },
});

const { loadLookupSuccess, onError } = commonSlice.actions;

//ASYNC ACTIONS
export const fetchLookups = (lookupTypes: LookupType[]): AppThunk => (
  dispatch,
  getState
) => {
  var loadedLookups = getState().common.lookups;
  var lookupToLoad: LookupType[] = [];

  lookupTypes.map((lookupType) => {
    if (!loadedLookups[lookupType]) {
      lookupToLoad.push(lookupType);
    }
  });

  if (lookupToLoad.length === 0) {
    console.log("no need to load");
    return;
  }

  clientQueryApiRequest()
    .get("/lookups/lookuplist")
    .then((response: AxiosResponse<LookupItemResponse[]>) => {
      dispatch(loadLookupSuccess(response.data));
    })
    .catch((err: any) => {
      dispatch(onError(err));
    });
};

// SELECTOR
export const selectLookup = (lookupType: LookupType) => (state: RootState) =>
  state.common.lookups[lookupType];

export default commonSlice.reducer;
