import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface MessagePromptState {
  showError: boolean;
  showSuccess: boolean;
  message: string;
}

const initialState: MessagePromptState = {
  showError: false,
  showSuccess: false,
  message: "",
};

const messagePromptSlice = createSlice({
  name: "messageprompt",
  initialState,
  reducers: {
    showError: (state: MessagePromptState, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.showError = true;
    },
    showSuccess: (state: MessagePromptState, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.showSuccess = true;
    },
    closePrompt: (state: MessagePromptState) => {
      state.showSuccess = false;
      state.showError = false;
      state.message = "";
    },
  },
});

export const { showError, showSuccess, closePrompt } =
  messagePromptSlice.actions;

export const selectShowError = (state: RootState) =>
  state.messageprompt.showError;
export const selectShowSuccess = (state: RootState) =>
  state.messageprompt.showSuccess;
export const selectMessage = (state: RootState) => state.messageprompt.message;

export const selectShowModal = (state: RootState) =>
  state.messageprompt.showError || state.messageprompt.showSuccess;

export default messagePromptSlice.reducer;
