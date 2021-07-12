import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import BarangayRow, { BarangayRowHeader } from "./barangay-rows";
import {
  fetchBarangays,
  selectBarangay,
} from "../../../app/+states/commonSlice";
import { selectReloadTable } from "../+state/adminSelectors";
import BarangaySaveModal from "./barangay-save-modal";
import {
  doneAction,
  selectActionToPerform,
} from "../../../app/+states/commonSlice";
import { ActionModule } from "../../../models/action-module.enum";
import { ActionType } from "../../../models/action-type.enum";
import { Barangay } from "../../../models/barangay";
import AddIcon from "@material-ui/icons/Add";
import ConfirmationModal from "../../../components/modals/confirmation-modal";
import EmptyList from "../../../components/empty-list/empty-list";
import BarangayRowDetails from "./barangay-rows-detail";
import { loadAdminAction, updateBarangayStatus } from "../+state/adminActions";

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

const BarangayList = () => {
  const Barangays = useSelector(selectBarangay);
  const dispatch = useDispatch();
  const style = useStyles();

  const actionToPerform = useSelector(selectActionToPerform);
  const reloadTable = useSelector(selectReloadTable);

  const [selectedBarangay, setSelectedBarangay] = useState<Barangay>(
    () => null
  );
  const [showBarangaySaveModal, setShowBarangaySaveModal] = useState(
    () => false
  );
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(
    () => false
  );
  const [expand, setExpand] = useState(() => false);

  useEffect(() => {
    dispatch(fetchBarangays());
  }, []);

  useEffect(() => {
    if (!!reloadTable) {
      dispatch(fetchBarangays());
      dispatch(loadAdminAction());
    }
  }, [reloadTable]);

  useEffect(() => {
    if (!actionToPerform) return;

    const { actionType, data, actionModule, expand } = actionToPerform;
    let barangay = data as Barangay;

    if (actionModule !== ActionModule.AdminBarangaysModule) return;

    setSelectedBarangay(barangay);

    switch (actionType) {
      case ActionType.AdminUpdateStatusBarangay:
        setShowUpdateStatusModal(true);
        break;

      case ActionType.AdminUpdateBarangay:
        setShowBarangaySaveModal(true);
        break;

      case ActionType.AdminExpandCollapsedBarangay:
        setExpand(expand);
        // do nothing
        break;

      default:
        break;
    }

    // Notify reducer action is already done
    dispatch(doneAction());
  }, [actionToPerform]);

  const closeBarangaySaveModal = () => {
    setShowBarangaySaveModal(false);
  };

  const enrollBarangay = () => {
    setSelectedBarangay(null);
    setShowBarangaySaveModal(true);
  };

  const closeUpdateStatusModal = () => {
    setShowUpdateStatusModal(false);
  };

  const onConfirmUpdateStatus = () => {
    const { isActive, barangayId } = selectedBarangay;

    dispatch(
      updateBarangayStatus(barangayId, {
        isActive: !isActive,
      })
    );
    setShowUpdateStatusModal(false);
  };

  return (
    <>
      <div className={style.newButtonDiv}>
        <Button
          color="primary"
          onClick={enrollBarangay}
          startIcon={<AddIcon />}
        >
          Create New
        </Button>
      </div>
      <Paper className={style.container}>
        <Table className={style.table} aria-label="Barangay table" size="small">
          <BarangayRowHeader />
          <TableBody>
            {Barangays.map((brgy) => {
              const isOpen =
                selectedBarangay?.barangayId === brgy.barangayId && expand;
              return (
                <Fragment key={brgy.barangayId.toString()}>
                  <BarangayRow
                    isOpen={isOpen}
                    barangay={brgy}
                    key={brgy.barangayId.toString()}
                  />
                  <BarangayRowDetails barangay={brgy} isOpen={isOpen} />
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
        {Barangays.length === 0 && (
          <EmptyList label="Barangay List is empty." />
        )}
      </Paper>
      <BarangaySaveModal
        barangay={selectedBarangay}
        isOpen={showBarangaySaveModal}
        onClose={closeBarangaySaveModal}
      />

      <ConfirmationModal
        open={showUpdateStatusModal}
        title={`${
          selectedBarangay?.isActive ? "Deactivate" : "Activate"
        } Barangay`}
        content={`Are you sure you want to ${
          selectedBarangay?.isActive ? "deactivate" : "activate"
        } this Barangay?`}
        btnNoTitle="No"
        btnYesTitle="Yes"
        onClickBtnNo={closeUpdateStatusModal}
        onClickBtnYes={onConfirmUpdateStatus}
      />
    </>
  );
};

export default BarangayList;
