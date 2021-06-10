import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import CropRow from "./crops-row";
import CropsFilter from "./crops-filter";
import { selectCrops } from "../farmerSelectors";
import CropRowHeader from "./crops-row-header";
import { FarmCrop } from "../farmer-models/farm-crop";
import ConfirmationModal from "../../../components/modals/confirmation-modal";
import { deleteCrop } from "../farmerActions";
import {
  doneAction,
  selectActionToPerform,
} from "../../../app/+states/commonSlice";
import { ActionType } from "../../../models/action-type.enum";
import CropHarvestModal from "./crops-harvest-modal";
import { ActionModule } from "../../../models/action-module.enum";
import AddIcon from "@material-ui/icons/Add";
import CropsSaveModal from "./crops-save-modal";
import { selectIsPending } from "../../../app/+states/userSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 10,
    },
    table: {},
    newButtonDiv: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 10,
    },
  })
);

const CropList = () => {
  const style = useStyles();
  const dispatch = useDispatch();

  const [selectedCrop, setSelectedCrop] = useState<FarmCrop>();
  const [showDeleteModal, setShowDeleteModal] = useState(() => false);
  const [showHarvestModal, setShowHarvestModal] = useState(() => false);
  const [showCropFormModal, setShowCropFormModal] = useState(() => false);

  const crops = useSelector(selectCrops);
  const actionToPerform = useSelector(selectActionToPerform);
  const isPending = useSelector(selectIsPending);

  useEffect(() => {
    if (!actionToPerform) return;

    const { actionType, data, actionModule } = actionToPerform;
    let crop = data as FarmCrop;

    if (actionModule !== ActionModule.FarmerCropsModule) return;

    setSelectedCrop(crop);

    switch (actionType) {
      case ActionType.HarvestCrops:
        setShowHarvestModal(true);
        break;

      case ActionType.DeleteCrops:
        setShowDeleteModal(true);
        break;

      case ActionType.UpdateCrops:
        setShowCropFormModal(true);
        break;

      default:
        break;
    }

    // Notify reducer action is already done
    dispatch(doneAction());
  }, [actionToPerform]);

  const closeHarvestModal = () => {
    setShowHarvestModal(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const onConfirmDelete = () => {
    dispatch(deleteCrop(selectedCrop?.farmCropId));
    setShowDeleteModal(false);
  };

  const enrollCrop = () => {
    setSelectedCrop(null);
    setShowCropFormModal(true);
  };

  const closeFormModal = () => {
    setShowCropFormModal(false);
  };

  return (
    <>
      {!isPending && (
        <div className={style.newButtonDiv}>
          <Button color="primary" onClick={enrollCrop} startIcon={<AddIcon />}>
            Create New
          </Button>
        </div>
      )}

      <Paper className={style.container}>
        <CropsFilter />
        <Table className={style.table} aria-label="farm table">
          <CropRowHeader />
          <TableBody>
            {crops.map((crop) => (
              <CropRow crop={crop} key={crop.farmCropId.toString()} />
            ))}
          </TableBody>
        </Table>

        <ConfirmationModal
          open={showDeleteModal}
          title="Delete Crop"
          content="Are you sure you want to delete this crop?"
          btnNoTitle="No"
          btnYesTitle="Yes"
          onClickBtnNo={closeDeleteModal}
          onClickBtnYes={onConfirmDelete}
        />
        <CropHarvestModal
          farmCropId={selectedCrop?.farmCropId}
          isOpen={showHarvestModal}
          onClose={closeHarvestModal}
        />

        <CropsSaveModal
          isOpen={showCropFormModal}
          farmCrop={selectedCrop}
          onClose={closeFormModal}
        />
      </Paper>
    </>
  );
};

export default CropList;
