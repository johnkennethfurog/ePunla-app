import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import FarmRow, { FarmRowHeader } from "./farm-rows";
import { fetchFarms, resetFarmerAction } from "../+state/farmerActions";
import {
  selectFarms,
  selectProfile,
  selectReloadTable,
} from "../+state/farmerSelectors";
import FarmSaveModal from "./farm-save-modal";
import {
  doneAction,
  selectActionToPerform,
} from "../../../app/+states/commonSlice";
import { ActionModule } from "../../../models/action-module.enum";
import { ActionType } from "../../../models/action-type.enum";
import { Farm } from "../+models/farm";
import AddIcon from "@material-ui/icons/Add";
import ConfirmationModal from "../../../components/modals/confirmation-modal";
import EmptyList from "../../../components/empty-list/empty-list";
import FarmRowDetail from "./farm-rows-detail";

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

const FarmList = () => {
  const farms = useSelector(selectFarms);
  const dispatch = useDispatch();
  const style = useStyles();

  const actionToPerform = useSelector(selectActionToPerform);
  const reloadTable = useSelector(selectReloadTable);
  const profile = useSelector(selectProfile);

  const [selectedFarm, setSelectedFarm] = useState<Farm>(() => null);
  const [showFarmSaveModal, setShowFarmSaveModal] = useState(() => false);
  const [showDeleteModal, setShowDeleteModal] = useState(() => false);
  const [expand, setExpand] = useState(() => false);

  useEffect(() => {
    if (!!profile) {
      dispatch(fetchFarms());
    }
  }, [profile]);

  useEffect(() => {
    if (!!reloadTable) {
      dispatch(fetchFarms());
    }
  }, [reloadTable]);

  useEffect(() => {
    if (!actionToPerform) return;

    const { actionType, data, actionModule, expand } = actionToPerform;
    let farm = data as Farm;

    if (actionModule !== ActionModule.FarmerFarmsModule) return;

    setSelectedFarm(farm);

    switch (actionType) {
      case ActionType.DeleteFarm:
        setShowDeleteModal(true);
        break;

      case ActionType.UpdateFarm:
        setShowFarmSaveModal(true);
        break;

      case ActionType.CreateFarm:
        setShowFarmSaveModal(true);
        break;

      case ActionType.ExpandCollapsedFarm:
        setExpand(expand);
        // do nothing
        break;

      default:
        break;
    }

    // Notify reducer action is already done
    dispatch(doneAction());
  }, [actionToPerform]);

  const closeFarmSaveModal = () => {
    dispatch(resetFarmerAction());
    setShowFarmSaveModal(false);
  };

  const enrollFarm = () => {
    setSelectedFarm(null);
    setShowFarmSaveModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const onConfirmDelete = () => {
    // dispatch(deleteCrop(selectedCrop?.farmCropId));
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className={style.newButtonDiv}>
        <Button color="primary" onClick={enrollFarm} startIcon={<AddIcon />}>
          Create New
        </Button>
      </div>
      <Paper className={style.container}>
        <Table className={style.table} aria-label="farm table">
          <FarmRowHeader />
          <TableBody>
            {farms.map((farm) => {
              const isOpen = selectedFarm?.farmId === farm.farmId && expand;
              return (
                <Fragment key={farm.farmId.toString()}>
                  <FarmRow
                    isOpen={isOpen}
                    farm={farm}
                    key={farm.farmId.toString()}
                  />
                  <FarmRowDetail farm={farm} isOpen={isOpen} />
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
        {farms.length === 0 && <EmptyList label="Farm List is empty." />}
      </Paper>
      <FarmSaveModal
        farm={selectedFarm}
        isOpen={showFarmSaveModal}
        onClose={closeFarmSaveModal}
      />

      <ConfirmationModal
        open={showDeleteModal}
        title="Delete Farm"
        content="Are you sure you want to delete this farm?"
        btnNoTitle="No"
        btnYesTitle="Yes"
        onClickBtnNo={closeDeleteModal}
        onClickBtnYes={onConfirmDelete}
      />
    </>
  );
};

export default FarmList;
