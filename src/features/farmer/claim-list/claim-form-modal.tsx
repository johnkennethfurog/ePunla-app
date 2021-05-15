import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  createStyles,
  makeStyles,
  Theme,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading } from "../../../app/commonSlice";
import { SimpleDropDown } from "../../../components/select/selects";
import useInput from "../../../hooks/useInput";
import { LookupItem } from "../../../models/lookup-item";
import { fetchCrops } from "../farmerActions";
import { selectCrops } from "../farmerSelectors";
import { Claim, DamageCause } from "../farmer-models/claim";
import { DamageCauseList } from "../farmer-models/damage-cause.enum";
import { DamageCauseOption } from "../farmer-models/damage-cause-option";
import classes from "*.module.css";

type ConfirmationModalProps = {
  createNew: boolean;
  claim?: Claim;
  isOpen: boolean;
  onClose: () => void;
};

const damagedAreaLookup: LookupItem[] = [
  {
    value: "Full",
    id: "Full",
  },
  {
    value: "Partial",
    id: "Partial",
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      flexGrow: 1,
    },
    image: {
      objectFit: "cover",
      width: "100%",
    },
  })
);

const mapDamageCauses = (damageCauses: DamageCause[]): DamageCauseOption[] => {
  return DamageCauseList.map((dmg) => {
    const dc = damageCauses.find((x) => x.damageTypeId === dmg.id);
    const damageCauseOption: DamageCauseOption = {
      damageType: dmg.value,
      damageTypeId: dmg.id as number,
      isSelected: !!dc,
      damagedAreaSize: dc?.damagedAreaSize || 0,
    };

    console.log("damageCauseOption", damageCauseOption);

    return damageCauseOption;
  });
};

const ClaimFormModal = (props: ConfirmationModalProps) => {
  const { createNew, isOpen, onClose, claim } = props;
  const style = useStyles();
  const dispatch = useDispatch();
  const [farmCropId, bindFarmCropId] = useInput(claim?.farmCropId || "");
  const [damagedArea, bindDamagedArea] = useInput(claim?.damagedArea || "Full");

  const [damageCause, setDamageCause] = useState<DamageCauseOption[]>(() => []);

  const isLoading = useSelector(selectIsLoading);

  const crops = useSelector(selectCrops);
  const [cropsLookup, setCropsLookup] = useState<LookupItem[]>(() => []);

  const onSave = () => {
    onClose();
  };

  useEffect(() => {
    if (!!isOpen) {
      setDamageCause(mapDamageCauses(claim?.damageCause || []));
      dispatch(
        fetchCrops({
          status: "planted",
        })
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (!!isOpen) {
      const lookup = crops.map((x) => {
        return {
          value: x.crop,
          id: x.farmCropId,
        } as LookupItem;
      });

      setCropsLookup(lookup);
    }
  }, [crops, isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {!!createNew ? "Create New Claim" : "UpdateClaim"}
      </DialogTitle>
      <DialogContent>
        <form className={style.form}>
          <Grid container spacing={2}>
            {/* LEFT AREA */}
            <Grid container spacing={2} item sm={12} md={6} lg={6} xl={6}>
              {/* DAMAGED AREA */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <SimpleDropDown
                  id="area_damaged"
                  label="DamagedArea"
                  fullWidth
                  bind={bindDamagedArea}
                  options={damagedAreaLookup}
                  hideEmptyOption={true}
                />
              </Grid>

              {/* CROP */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <SimpleDropDown
                  id="crop"
                  label="Crop"
                  fullWidth
                  bind={bindFarmCropId}
                  options={cropsLookup}
                  hideEmptyOption={true}
                />
              </Grid>

              {/* DAMAGE CAUSE */}

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <FormLabel component="legend">Cause of Damage</FormLabel>
                <FormGroup>
                  {damageCause.map((cause) => {
                    return (
                      <Fragment key={cause.damageTypeId.toString()}>
                        <FormControlLabel
                          key={cause.damageTypeId.toString()}
                          control={
                            <Checkbox
                              checked={cause.isSelected}
                              name="antoine"
                            />
                          }
                          label={cause.damageType}
                        />
                        <TextField
                          type="number"
                          value={cause.damagedAreaSize}
                          variant="outlined"
                          InputProps={{
                            disabled: !cause.isSelected,
                            endAdornment: (
                              <InputAdornment position="end">
                                sqm.
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Fragment>
                    );
                  })}
                </FormGroup>
              </Grid>
            </Grid>

            {/* RIGHT AREA */}
            <Grid container spacing={2} item sm={12} md={6} lg={6} xl={6}>
              {/* DESCRIPTION */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  id="standard-multiline-static"
                  label="Description"
                  multiline
                  fullWidth
                  rows={8}
                  style={{ flexGrow: 1 }}
                  variant="outlined"
                  defaultValue="Default Value"
                />
              </Grid>

              {/* IMAGE */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  className={style.image}
                  src={"https://i.stack.imgur.com/y9DpT.jpg"}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClaimFormModal;
