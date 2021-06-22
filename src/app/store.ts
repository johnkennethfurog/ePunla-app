import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import farmerReducer from "../features/farmer/+state/farmerSlice";
import commonReducer from "./+states/commonSlice";
import messagePromptSliceReducer from "./+states/messagePromptSlice";
import userReducer from "./+states/userSlice";
import adminReducer from "../features/admin/+state/adminSlice";
export const store = configureStore({
  reducer: {
    farmer: farmerReducer,
    common: commonReducer,
    messageprompt: messagePromptSliceReducer,
    user: userReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
