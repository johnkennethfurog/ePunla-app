import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonLoading from "../../../components/button-loading/button-loading";

import { validateClaim } from "../+state/adminActions";
import { selectAdminIsSaving } from "../+state/adminSelectors";
import { ValidateClaimPayload } from "../+models/validate-claim-payload";
import useInput from "../../../hooks/useInput";

type ClaimValidateModalProps = {
  claimId: number;
  isApproved: boolean;
  isOpen: boolean;
  onClose: () => void;
};

const ClaimValidateModal = (props: ClaimValidateModalProps) => {
  const { isOpen, onClose, claimId, isApproved } = props;

  const dispatch = useDispatch();

  const [remarks, bindRemarks] = useInput("");

  const isSaving = useSelector(selectAdminIsSaving);

  const closeHarvestModal = () => {
    if (!isSaving) {
      onClose();
    }
  };

  const onValidate = () => {
    const payload: ValidateClaimPayload = {
      isApproved,
      remarks,
    };
    dispatch(validateClaim(claimId, payload, onClose));
  };

  return (
    <Dialog open={isOpen} onClose={closeHarvestModal} fullWidth maxWidth="sm">
      <DialogTitle>{isApproved ? "Approve Claim" : "Deny Claim"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Remarks"
          multiline
          fullWidth
          rows={8}
          style={{ flexGrow: 1 }}
          variant="outlined"
          {...bindRemarks}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isSaving} onClick={onClose} color="primary">
          Cancel
        </Button>
        <ButtonLoading
          onClick={onValidate}
          autoFocus
          text={isApproved ? "Approve" : "Deny"}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ClaimValidateModal;
