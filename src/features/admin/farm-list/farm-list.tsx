import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import FarmRow, { FarmRowHeader } from "./farm-rows";
import { fetchFarms } from "../+state/adminActions";
import { selectFarms, selectReloadTable } from "../+state/adminSelectors";
import {
  doneAction,
  selectActionToPerform,
} from "../../../app/+states/commonSlice";
import { ActionModule } from "../../../models/action-module.enum";
import { ActionType } from "../../../models/action-type.enum";
import Farm from "../+models/farm";

import ConfirmationModal from "../../../components/modals/confirmation-modal";
import EmptyList from "../../../components/empty-list/empty-list";
import FarmRowDetail from "./farm-rows-detail";
import { Page, PagedRequest } from "../../../models/paged-request";
import { FarmSearchField } from "../+models/farm-search-field";

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

  const [selectedFarm, setSelectedFarm] = useState<Farm>(() => null);
  const [showDeleteModal, setShowDeleteModal] = useState(() => false);
  const [expand, setExpand] = useState(() => false);

  useEffect(() => {
    loadFarms();
  }, []);

  useEffect(() => {
    if (!!reloadTable) {
      loadFarms();
    }
  }, [reloadTable]);

  const loadFarms = () => {
    const page: Page = {
      pageNumber: 1,
      pageSize: 10,
    };

    const searchField: FarmSearchField = {
      status: null,
      barangayId: null,
      searchText: null,
    };

    const payload: PagedRequest<FarmSearchField> = {
      page,
      searchField,
    };
    dispatch(fetchFarms(payload));
  };

  useEffect(() => {
    if (!actionToPerform) return;

    const { actionType, data, actionModule, expand } = actionToPerform;
    let farm = data as Farm;

    if (actionModule !== ActionModule.AdminFarmsModule) return;

    setSelectedFarm(farm);

    switch (actionType) {
      case ActionType.AdminApproveFarm:
        break;

      case ActionType.AdminDeclineFarm:
        break;

      case ActionType.AdminExpandCollapsedFarm:
        setExpand(expand);
        // do nothing
        break;

      default:
        break;
    }

    // Notify reducer action is already done
    dispatch(doneAction());
  }, [actionToPerform]);

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const onConfirmDelete = () => {
    // dispatch(deleteCrop(selectedCrop?.farmCropId));
    setShowDeleteModal(false);
  };

  return (
    <>
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
