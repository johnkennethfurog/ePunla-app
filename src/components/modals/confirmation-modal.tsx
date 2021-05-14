import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import React from "react";

type ConfirmationModalProps = {
  open: boolean;
  title: string;
  content: string;
  btnYesTitle: string;
  onClickBtnYes: () => void;
  btnNoTitle: string;
  onClickBtnNo: () => void;
};

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {
    open,
    btnNoTitle,
    btnYesTitle,
    onClickBtnNo,
    onClickBtnYes,
    title,
    content,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={onClickBtnNo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickBtnNo} color="primary">
          {btnNoTitle}
        </Button>
        <Button onClick={onClickBtnYes} color="primary" autoFocus>
          {btnYesTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
