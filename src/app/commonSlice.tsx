import { createSlice, Dictionary, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { ActionTodo } from "../models/action-to-do";
import { LookupItem } from "../models/lookup-item";
import { LookupItemResponse } from "../models/lookup-item-response";
import { LookupType } from "../models/lookup-type.enum";
import { PagedRequest } from "../models/paged-request";
import { clientQueryApiRequest } from "../utils/client";
import { AppThunk, RootState } from "./store";

interface CommonState {
  lookups: Dictionary<LookupItem[]>;
  error: any;
  isLoading: boolean;
  cropsLookup: LookupItem[];
  actionPerform: ActionTodo;
}

const initialState: CommonState = {
  lookups: {},
  error: null,
  isLoading: false,
  cropsLookup: [],
  actionPerform: null,
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
      state.isLoading = false;
    },
    onError: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    onLoadLookup: (state) => {
      state.isLoading = true;
    },
    onClearCropLookup: (state) => {
      state.cropsLookup = [];
    },
    loadCropLookupSuccess: (
      state: CommonState,
      action: PayloadAction<LookupItem[]>
    ) => {
      state.cropsLookup = action.payload;
      state.isLoading = false;
    },
    noAction: () => {},
    onDoAction: (state: CommonState, action: PayloadAction<ActionTodo>) => {
      state.actionPerform = action.payload;
    },
    onDoneAction: (state: CommonState) => {
      state.actionPerform = null;
    },
  },
});

const {
  loadCropLookupSuccess,
  loadLookupSuccess,
  onError,
  onDoAction,
  onDoneAction,
  onClearCropLookup,
} = commonSlice.actions;

export const clearCropLookup = onClearCropLookup;

export const doAction = onDoAction;
export const doneAction = onDoneAction;

//ASYNC ACTIONS
export const fetchCropsLookups =
  (keyword: string): AppThunk =>
  (dispatch, getState) => {
    const payload: PagedRequest<{ keyword: string }> = {
      searchField: { keyword },
      page: {
        pageNumber: 1,
        pageSize: 10,
      },
    };

    clientQueryApiRequest()
      .post("/crops/lookup", payload)
      .then((response: AxiosResponse<LookupItem[]>) => {
        dispatch(loadCropLookupSuccess(response.data));
      })
      .catch((err: any) => {
        dispatch(onError(err));
      });
  };

export const fetchLookups =
  (lookupTypes: LookupType[]): AppThunk =>
  (dispatch, getState) => {
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
export const selectIsLoading = (state: RootState) => state.common.isLoading;

export const selectLookup = (lookupType: LookupType) => (state: RootState) =>
  state.common.lookups[lookupType];

export const selectCropsLookup = (state: RootState) => state.common.cropsLookup;

export const selectActionToPerform = (state: RootState) =>
  state.common.actionPerform;

export default commonSlice.reducer;
