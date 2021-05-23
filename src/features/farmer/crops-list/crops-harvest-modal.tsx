import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonLoading from "../../../components/button-loading/button-loading";
import AppDatePicker from "../../../components/date-picker/date-picker";
import useDateInput from "../../../hooks/useDateInput";

import { harvestCrop } from "../farmerActions";
import { selectIsSaving } from "../farmerSelectors";

type CropHarvestModalProps = {
  farmCropId: number;
  isOpen: boolean;
  onClose: () => void;
};

const CropHarvestModal = (props: CropHarvestModalProps) => {
  const { isOpen, onClose, farmCropId } = props;

  const dispatch = useDispatch();

  const [harvestDate, bindHarvestDate] = useDateInput(moment());

  const isSaving = useSelector(selectIsSaving);

  const closeHarvestModal = () => {
    if (!isSaving) {
      onClose();
    }
  };

  const onHarvest = () => {
    dispatch(harvestCrop(farmCropId, harvestDate, onClose));
  };

  return (
    <Dialog open={isOpen} onClose={closeHarvestModal} fullWidth maxWidth="sm">
      <DialogTitle>{"Harvest Crop"}</DialogTitle>
      <DialogContent>
        <AppDatePicker
          label="Harvest Date"
          inputVariant={"outlined"}
          maxDate={moment()}
          {...bindHarvestDate}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isSaving} onClick={onClose} color="primary">
          Cancel
        </Button>
        <ButtonLoading onClick={onHarvest} autoFocus text="Save" />
      </DialogActions>
    </Dialog>
  );
};

export default CropHarvestModal;
