import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closePrompt,
  selectMessage,
  selectShowError,
  selectShowModal,
  selectShowSuccess,
} from "../../app/messagePromptSlice";

type MessagePromptProps = {};

const MessagePrompt = (props: MessagePromptProps) => {
  const dispatch = useDispatch();

  const showModal = useSelector(selectShowModal);
  const showError = useSelector(selectShowError);
  const showSuccess = useSelector(selectShowSuccess);
  const message = useSelector(selectMessage);

  const onClose = () => {
    dispatch(closePrompt());
  };

  return (
    <Snackbar open={showModal} autoHideDuration={6000} onClose={onClose}>
      <div>
        {showError && (
          <Alert onClose={onClose} severity="error">
            {message}
          </Alert>
        )}

        {showSuccess && (
          <Alert onClose={onClose} severity="success">
            {message}
          </Alert>
        )}
      </div>
    </Snackbar>
  );
};

export default MessagePrompt;
