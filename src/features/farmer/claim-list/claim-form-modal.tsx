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
import { selectClaim } from "../+state/farmerSlice";

import { SimpleDropDown } from "../../../components/select/selects";
import useInput from "../../../hooks/useInput";
import { LookupItem } from "../../../models/lookup-item";
import {
  addValidationError,
  fetchCrops,
  saveClaim,
  uploadPhoto,
} from "../+state/farmerActions";
import { selectCrops, selectIsSaving } from "../+state/farmerSelectors";
import { Claim } from "../+models/claim";
import ClaimDamageCause from "./claim-damage-cause";
import {
  ClaimCausePayload,
  ClaimSavePayload,
} from "../+models/claim-save-payload";
import { MapToDamageCausePayload } from "../+utils/damabe-cause-mapper";
import ImageUploader from "../../../components/image-uploader/image-uploader";
import { ImageUploadResponse } from "../../../models/image-upload-response";
import ErrorAlert from "../../../components/error-alert/error-alert";
import ButtonLoading from "../../../components/button-loading/button-loading";

type ClaimFormModalProps = {
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

const ClaimFormModal = (props: ClaimFormModalProps) => {
  const { isOpen, onClose, claim } = props;

  const [isNew, setIsNew] = useState(true);

  const style = useStyles();
  const dispatch = useDispatch();

  const [farmCropId, bindFarmCropId, setFarmCropId] = useInput("");
  const [description, bindDescription, setDescription] = useInput("");
  const [damagedArea, bindDamagedArea, setDamagedArea] = useInput("");

  const [image, setImage] = useState<string>(claim?.photoUrl);
  const [imageToUpload, setImageToUpload] = useState<File>();
  const [claimCauses, setClaimCauses] = useState<ClaimCausePayload[]>(() => []);
  const [cropsLookup, setCropsLookup] = useState<LookupItem[]>(() => []);

  const isSaving = useSelector(selectIsSaving);
  const crops = useSelector(selectCrops);

  useEffect(() => {
    if (!!isOpen) {
      setClaimCauses(MapToDamageCausePayload(claim?.damageCause || []));
      setFarmCropId(claim?.farmCropId.toString() || "");
      setDescription(claim?.description || "");
      setDamagedArea(claim?.damagedArea || "Full");
      setImage(claim?.photoUrl);

      dispatch(
        fetchCrops({
          status: "planted",
        })
      );

      setIsNew(!claim);
    } else {
      dispatch(selectClaim(null));
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

      if (!!claim) {
        lookup.push({
          value: claim.crop,
          id: claim.farmCropId,
        });
      }

      setCropsLookup(lookup);
    }
  }, [crops, isOpen]);

  const onSave = () => {
    if (claimCauses.length === 0) {
      dispatch(addValidationError("Kindly select atleast 1 Cause of Damage."));
      return;
    }

    if (!farmCropId) {
      dispatch(addValidationError("Kindly select a crop."));
      return;
    }

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
      farmCropId: +farmCropId,
      damagedArea,
      description,
      photoUrl: image?.url || claim?.photoUrl,
      photoId: image?.publicId || claim?.photoId,
      claimCauses,
    };

    dispatch(saveClaim(payload, onClose));
  };

  const onChangeDamageCauses = (causes: ClaimCausePayload[]) => {
    setClaimCauses(causes);
  };

  const closeClaimModal = () => {
    if (!isSaving) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeClaimModal} fullWidth maxWidth="md">
      <DialogTitle>{!!isNew ? "Create New Claim" : "Update Claim"}</DialogTitle>
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
        <Button disabled={isSaving} onClick={onClose} color="primary">
          Cancel
        </Button>
        <ButtonLoading onClick={onSave} autoFocus text="Save" />
      </DialogActions>

      <ErrorAlert />
    </Dialog>
  );
};

export default ClaimFormModal;
