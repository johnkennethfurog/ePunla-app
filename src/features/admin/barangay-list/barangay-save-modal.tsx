import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarangayAreaSavePayload,
  BarangaySavePayload,
} from "../+models/barangay-save-payload";
import { addValidationError, saveBarangay } from "../+state/adminActions";
import { selectAdminIsSaving, selectError } from "../+state/adminSelectors";
import ButtonLoading from "../../../components/button-loading/button-loading";
import ErrorAlert from "../../../components/error-alert/error-alert";
import useInput from "../../../hooks/useInput";
import { Barangay } from "../../../models/barangay";
import AddIcon from "@material-ui/icons/Add";
import BarangayAreaField from "./barangay-area-field";

type BarangaySaveModalProps = {
  barangay?: Barangay;
  isOpen: boolean;
  onClose: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    newAreaDiv: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 10,
      marginTop: 10,
    },
  })
);

const BarangaySaveModal = (props: BarangaySaveModalProps) => {
  const { isOpen, onClose, barangay } = props;

  const dispatch = useDispatch();
  const style = useStyles();

  const isSaving = useSelector(selectAdminIsSaving);

  const [isNew, setIsNew] = useState(true);
  const [areas, setAreas] = useState<BarangayAreaSavePayload[]>([]);

  const [barangayName, bindBarangayName, setBarangayName] = useInput("");

  useEffect(() => {
    if (!!isOpen) {
      setIsNew(!barangay);
      setBarangayName(barangay?.barangay || "");

      const brgyareas = barangay?.areas || [];
      const barangayAreas: BarangayAreaSavePayload[] = brgyareas.map((x) => ({
        barangayAreaId: x.barangayAreaId,
        area: x.area,
        areaIsActive: x.areaIsActive,
      }));

      setAreas(barangayAreas);
    }
  }, [isOpen]);

  const closeBarangayModal = () => {
    if (!isSaving) {
      onClose();
    }
  };

  const onSave = () => {
    if (!barangayName) {
      dispatch(addValidationError("Barangay name is required."));
      return;
    }

    if (!areas.every((ar) => !!ar.area)) {
      dispatch(addValidationError("All areas should have name."));
      return;
    }

    const areasToSave: BarangayAreaSavePayload[] = areas.map((ar) => {
      const barangayAreaId =
        typeof ar.barangayAreaId === "string" ? null : ar.barangayAreaId;

      return { area: ar.area, barangayAreaId, areaIsActive: ar.areaIsActive };
    });

    const payload: BarangaySavePayload = {
      barangayId: barangay?.barangayId,
      barangayName: barangayName,
      areas: areasToSave,
    };

    dispatch(saveBarangay(payload, onClose));
  };

  const onAddArea = () => {
    setAreas([
      ...areas,
      { area: "", barangayAreaId: generateKey(), areaIsActive: true },
    ]);
  };

  const onRemoveArea = (area: BarangayAreaSavePayload, index: number) => {
    const newAreas = [...areas];
    newAreas.splice(index, 1);
    setAreas(newAreas);
  };

  const onChangeArea = (area: BarangayAreaSavePayload, index: number) => {
    const newAreas = [...areas];
    newAreas[index] = area;
    setAreas(newAreas);
  };

  const generateKey = () => {
    return `$id_${new Date().getTime()}`;
  };

  return (
    <Dialog open={isOpen} onClose={closeBarangayModal} fullWidth maxWidth="sm">
      <DialogTitle>
        {isNew ? "Create New Barangay" : "Update Barangay"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Barangay"
          fullWidth
          style={{ flexGrow: 1 }}
          variant="outlined"
          {...bindBarangayName}
        />

        <div className={style.newAreaDiv}>
          <Button color="primary" onClick={onAddArea} startIcon={<AddIcon />}>
            Add Area
          </Button>
        </div>

        {areas.map((ar, index) => {
          return (
            <BarangayAreaField
              key={ar.barangayAreaId}
              area={ar}
              index={index}
              onChange={onChangeArea}
              onRemove={onRemoveArea}
            />
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button disabled={isSaving} onClick={onClose} color="primary">
          Cancel
        </Button>
        <ButtonLoading onClick={onSave} autoFocus text={"Save"} />
      </DialogActions>
      <ErrorAlert errorSelector={selectError} />
    </Dialog>
  );
};

export default BarangaySaveModal;
