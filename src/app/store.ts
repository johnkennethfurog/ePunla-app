import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import farmerReducer from "../features/farmer/farmerSlice";
import commonReducer from "./commonSlice";
import messagePromptSliceReducer from "./messagePromptSlice";

export const store = configureStore({
  reducer: {
    farmer: farmerReducer,
    common: commonReducer,
    messageprompt: messagePromptSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
