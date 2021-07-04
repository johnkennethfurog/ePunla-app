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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ButtonLoading from "../../../components/button-loading/button-loading";
import ErrorAlert from "../../../components/error-alert/error-alert";
import { SimpleDropDown } from "../../../components/select/selects";
import useInput from "../../../hooks/useInput";
import { LookupItem } from "../../../models/lookup-item";
import { Crop } from "../+models/crop";
import { CropSavePayload } from "../+models/crop-save-payload";
import { addValidationError, saveCrop } from "../+state/adminActions";
import {
  selectAdminIsSaving,
  selectCategories,
  selectError,
} from "../+state/adminSelectors";

type CropsSaveModalProps = {
  crop?: Crop;
  isOpen: boolean;
  onClose: () => void;
};

const CropsSaveModal = (props: CropsSaveModalProps) => {
  const { isOpen, onClose, crop } = props;

  const dispatch = useDispatch();

  const isSaving = useSelector(selectAdminIsSaving);
  const categories = useSelector(selectCategories);

  const [isNew, setIsNew] = useState(true);
  const [categoriesLookup, setCategoriesLookup] = useState<LookupItem[]>(
    () => []
  );

  const [categoryId, bindCategoryId, setCategoryId] = useInput("");
  const [duration, bindduration, setduration] = useInput("");
  const [cropName, bindCropName, setCropName] = useInput("");

  useEffect(() => {
    if (!!isOpen) {
      setIsNew(!crop);

      setCategoryId(crop?.categoryId.toString() || "");
      setduration(crop?.duration.toString() || "");
      setCropName(crop?.crop.toString() || "");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!!isOpen) {
      const lookup = categories.map((x) => {
        return {
          value: x.category,
          id: x.categoryId,
        } as LookupItem;
      });

      setCategoriesLookup(lookup);
    }
  }, [categories, isOpen]);

  const closeCropsModal = () => {
    if (!isSaving) {
      onClose();
    }
  };

  const onSave = () => {
    if (!cropName) {
      dispatch(addValidationError("Crop name is required."));
      return;
    }

    if (!categoryId) {
      dispatch(addValidationError("Kindly select a category."));
      return;
    }

    if (!duration || +duration <= 0) {
      dispatch(addValidationError("Kindly state the crop's duration."));
      return;
    }

    const payload: CropSavePayload = {
      cropId: crop?.cropId,
      categoryId: +categoryId,
      duration: +duration,
      crop: cropName,
    };

    dispatch(saveCrop(payload, onClose));
  };

  return (
    <Dialog open={isOpen} onClose={closeCropsModal} fullWidth maxWidth="sm">
      <DialogTitle>{isNew ? "New Crop" : "Update Crop"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <SimpleDropDown
              id="category"
              label="category"
              required
              fullWidth
              bind={bindCategoryId}
              options={categoriesLookup}
              hideEmptyOption={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              label="Crop"
              fullWidth
              {...bindCropName}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              type="number"
              label="Duration"
              fullWidth
              {...bindduration}
              required
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">day(s)</InputAdornment>
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
