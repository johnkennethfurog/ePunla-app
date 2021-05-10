import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import farmerReducer from "../features/farmer/farmerSlice";
import commonReducer from "./commonSlice";

export const store = configureStore({
  reducer: {
    farmer: farmerReducer,
    common: commonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
