import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCropsLookups,
  clearCropLookup,
  selectCropsLookup,
} from "../../../app/+states/commonSlice";
import AppAsyncAutoComplete from "../../../components/autocomplete/app-async-autocomplete";
import ButtonLoading from "../../../components/button-loading/button-loading";
import AppDatePicker from "../../../components/date-picker/date-picker";
import ErrorAlert from "../../../components/error-alert/error-alert";
import { SimpleDropDown } from "../../../components/select/selects";
import useDateInput from "../../../hooks/useDateInput";
import useInput from "../../../hooks/useInput";
import useLookup from "../../../hooks/useLookup";
import { LookupItem } from "../../../models/lookup-item";
import { FarmCrop } from "../+models/farm-crop";
import { FarmCropSavePayload } from "../+models/farm-crop-save-payload";
import {
  addValidationError,
  fetchFarms,
  saveFarmCrop,
} from "../+state/farmerActions";
import {
  selectError,
  selectFarms,
  selectIsSaving,
} from "../+state/farmerSelectors";

type CropsSaveModalProps = {
  farmCrop?: FarmCrop;
  isOpen: boolean;
  onClose: () => void;
};

const CropsSaveModal = (props: CropsSaveModalProps) => {
  const { isOpen, onClose, farmCrop } = props;

  const dispatch = useDispatch();

  const isSaving = useSelector(selectIsSaving);
  const farms = useSelector(selectFarms);

  const [isNew, setIsNew] = useState(true);
  const [farmsLookup, setFarmsLookup] = useState<LookupItem[]>(() => []);

  const [cropId, bindCrop, setCrop] = useLookup(null);

  const [datePlanted, bindDatePlanted, setDatePlanted] = useDateInput(moment());

  const [farmId, bindFarmId, setFarmId] = useInput("");
  const [areaSize, bindAreaSize, setAreaSize] = useInput("");

  useEffect(() => {
    if (!!isOpen) {
      setIsNew(!farmCrop);

      setFarmId(farmCrop?.farmId.toString() || "");
      setAreaSize(farmCrop?.areaSize.toString() || "");
      setDatePlanted(moment(farmCrop?.plantedDate));
      setCrop(farmCrop?.cropId || "");

      dispatch(fetchFarms(true));
    }
  }, [isOpen]);

  useEffect(() => {
    if (!!isOpen) {
      const lookup = farms.map((x) => {
        return {
          value: x.name,
          id: x.farmId,
        } as LookupItem;
      });

      setFarmsLookup(lookup);
    }
  }, [farms, isOpen]);

  const closeCropsModal = () => {};

  const onSave = () => {
    if (!farmId) {
      dispatch(addValidationError("Kindly select a farm."));
      return;
    }

    if (!cropId) {
      dispatch(addValidationError("Kindly select a crop."));
      return;
    }

    if (!areaSize || +areaSize <= 0) {
      dispatch(addValidationError("Kindly state the planted crop's are size."));
      return;
    }

    const payload: FarmCropSavePayload = {
      farmCropId: farmCrop?.farmCropId,
      cropId: +cropId,
      areaSize: +areaSize,
      datePlanted: datePlanted.toDate(),
      farmId: +farmId,
    };

    dispatch(saveFarmCrop(payload, onClose));
  };

  return (
    <Dialog open={isOpen} onClose={closeCropsModal} fullWidth maxWidth="sm">
      <DialogTitle>{isNew ? "Enroll Crop" : "Harvest Crop"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <SimpleDropDown
              id="farm"
              label="Farm"
              required
              fullWidth
              bind={bindFarmId}
              options={farmsLookup}
              hideEmptyOption={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <AppAsyncAutoComplete
              required
              initialValue={{ id: farmCrop?.cropId, value: farmCrop?.crop }}
              loadLookups={(keyword: string) => {
                dispatch(fetchCropsLookups(keyword));
              }}
              clearLookups={() => {
                dispatch(clearCropLookup());
              }}
              lookupSelector={selectCropsLookup}
              label="Select Crop"
              id="selectCrop"
              {...bindCrop}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <AppDatePicker
              required
              label="Planted Date"
              inputVariant={"outlined"}
              maxDate={moment()}
              {...bindDatePlanted}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
              type="number"
              label="Area Size"
              fullWidth
              {...bindAreaSize}
              required
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">sqm.</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button disabled={isSaving} onClick={onClose} color="primary">
          Cancel
        </Button>
        <ButtonLoading onClick={onSave} autoFocus text="Save" />
      </DialogActions>
      <ErrorAlert errorSelector={selectError} />
    </Dialog>
  );
};

export default CropsSaveModal;
