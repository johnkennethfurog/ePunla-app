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
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading } from "../../../app/commonSlice";
import { SimpleDropDown } from "../../../components/select/selects";
import useInput from "../../../hooks/useInput";
import { LookupItem } from "../../../models/lookup-item";
import { fetchCrops, saveClaim, uploadPhoto } from "../farmerActions";
import { selectCrops, selectIsSaving } from "../farmerSelectors";
import { Claim } from "../farmer-models/claim";
import ClaimDamageCause from "./claim-damage-cause";
import {
  ClaimCausePayload,
  ClaimSavePayload,
} from "../farmer-models/claim-save-payload";
import { MapToDamageCausePayload } from "../farmer-utils/damabe-cause-mapper";
import ImageUploader from "../../../components/image-uploader/image-uploader";
import { ImageUploadResponse } from "../../../models/image-upload-response";

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

const ClaimFormModal = (props: ConfirmationModalProps) => {
  const { createNew, isOpen, onClose, claim } = props;
  const style = useStyles();
  const dispatch = useDispatch();
  const [image] = useState<string>(claim?.photoUrl);
  const [imageToUpload, setImageToUpload] = useState<File>();
  const [farmCropId, bindFarmCropId] = useInput(claim?.farmCropId || "");
  const [description, bindDescription] = useInput(claim?.description || "");
  const [damagedArea, bindDamagedArea] = useInput(claim?.damagedArea || "Full");
  const [claimCauses, setClaimCauses] = useState<ClaimCausePayload[]>(() => []);

  const isSaving = useSelector(selectIsSaving);

  const crops = useSelector(selectCrops);
  const [cropsLookup, setCropsLookup] = useState<LookupItem[]>(() => []);

  useEffect(() => {
    if (!!isOpen) {
      setClaimCauses(MapToDamageCausePayload(claim?.damageCause || []));
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

  useEffect(() => {
    if (!isSaving) {
    }
  }, [isSaving]);

  const onSave = () => {
    if (!imageToUpload) {
      save();
      return;
    }

    dispatch(
      uploadPhoto(imageToUpload, (img) => {
        save(img);
      })
    );
  };

  const save = (image?: ImageUploadResponse) => {
    const payload: ClaimSavePayload = {
      claimId: claim?.claimId,
      farmCropId: farmCropId as number,
      damagedArea,
      description,
      photoUrl: image?.url,
      photoId: image?.publicId,
      claimCauses,
    };
    dispatch(saveClaim(payload, onClose));
  };

  const onChangeDamageCauses = (causes: ClaimCausePayload[]) => {
    setClaimCauses(causes);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {!!createNew ? "Create New Claim" : "UpdateClaim"}
      </DialogTitle>
      <DialogContent>
        <form className={style.form}>
          <Grid alignItems="flex-start" container spacing={2}>
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
                <ClaimDamageCause
                  isOpen={isOpen}
                  causes={claimCauses}
                  onChange={onChangeDamageCauses}
                />
              </Grid>
            </Grid>

            {/* RIGHT AREA */}
            <Grid
              alignItems="flex-start"
              container
              spacing={2}
              item
              sm={12}
              md={6}
              lg={6}
              xl={6}
            >
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
                  {...bindDescription}
                />
              </Grid>

              {/* IMAGE */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <ImageUploader
                  image={image}
                  onSelectImage={(img) => setImageToUpload(img)}
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
