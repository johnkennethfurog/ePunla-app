import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonLoading from "../../../components/button-loading/button-loading";
import AppDatePicker from "../../../components/date-picker/date-picker";
import { SimpleDropDown } from "../../../components/select/selects";
import useInput from "../../../hooks/useInput";
import { LookupItem } from "../../../models/lookup-item";
import { Farm } from "../farmer-models/farm";
import { selectIsSaving } from "../farmerSelectors";

type FarmSaveModalProps = {
  farm?: Farm;
  isOpen: boolean;
  onClose: () => void;
};

const FarmSaveModal = (props: FarmSaveModalProps) => {
  const { isOpen, onClose, farm } = props;

  const isSaving = useSelector(selectIsSaving);
  const barangays: any[] = [];
  const [isNew, setIsNew] = useState(true);

  const [farmName, bindFarmName, setFarmName] = useInput("");
  const [barangayId, bindBarangayId, setBarangayId] = useInput("");
  const [areaId, bindAreaId, setAreaId] = useInput("");
  const [address, bindAddress, setAddress] = useInput("");
  const [areaSize, bindAreaSize, seAreaSize] = useInput("");

  const [barangayLookup, setBarangayLookup] = useState<LookupItem[]>(() => []);
  const [areaLookup, setAreaLookup] = useState<LookupItem[]>(() => []);

  useEffect(() => {
    if (!!isOpen) {
      const lookup = barangays.map((x) => {
        return {
          value: x.barangayId,
          id: x.name,
        } as LookupItem;
      });

      setBarangayLookup(lookup);
    }
  }, [barangays, isOpen]);

  const closeFarmSaveModal = () => {};

  const onSave = () => {};

  return (
    <Dialog open={isOpen} onClose={closeFarmSaveModal} fullWidth maxWidth="sm">
      <DialogTitle>{isNew ? "Enrolll Farm" : "Update Farm"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid container spacing={2} item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Grid item>
              <TextField
                label="Name"
                fullWidth
                {...bindFarmName}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <SimpleDropDown
                label="Barangay"
                required
                fullWidth
                bind={bindBarangayId}
                options={barangayLookup}
                hideEmptyOption={true}
              />
            </Grid>
            <Grid item>
              <SimpleDropDown
                label="Area"
                required
                fullWidth
                bind={bindAreaId}
                options={areaLookup}
                hideEmptyOption={true}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Address"
                fullWidth
                {...bindAddress}
                required
                multiline
                rows={5}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                type="number"
                {...bindAreaSize}
                fullWidth
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">sqm.</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}></Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button disabled={isSaving} onClick={onClose} color="primary">
          Cancel
        </Button>
        <ButtonLoading onClick={onSave} autoFocus text="Save" />
      </DialogActions>
    </Dialog>
  );
};

export default FarmSaveModal;
