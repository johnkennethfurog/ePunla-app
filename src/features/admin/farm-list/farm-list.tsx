import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import {
  makeStyles,
  Theme,
  createStyles,
  TablePagination,
} from "@material-ui/core";
import FarmRow, { FarmRowHeader } from "./farm-rows";
import { selectFarms, selectFarmsPageCount } from "../+state/adminSelectors";
import {
  doneAction,
  selectActionToPerform,
} from "../../../app/+states/commonSlice";
import { ActionModule } from "../../../models/action-module.enum";
import { ActionType } from "../../../models/action-type.enum";
import Farm from "../+models/farm";

import EmptyList from "../../../components/empty-list/empty-list";
import FarmRowDetail from "./farm-rows-detail";
import FarmFilter from "./farm-filter";
import FarmValidateModal from "./farm-validate-modal";

const useStyles = makeStyles(() =>
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
  const dispatch = useDispatch();
  const style = useStyles();

  const farms = useSelector(selectFarms);
  const pageCount = useSelector(selectFarmsPageCount);

  const actionToPerform = useSelector(selectActionToPerform);

  const [selectedFarm, setSelectedFarm] = useState<Farm>(() => null);
  const [showValidationModal, setShowValidationModal] = useState(() => false);
  const [expand, setExpand] = useState(() => false);
  const [isApproved, setIsApproved] = useState(() => false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!actionToPerform) return;

    const { actionType, data, actionModule, expand } = actionToPerform;
    let farm = data as Farm;

    if (actionModule !== ActionModule.AdminFarmsModule) return;

    setSelectedFarm(farm);

    switch (actionType) {
      case ActionType.AdminApproveFarm:
        setIsApproved(true);
        setShowValidationModal(true);
        break;

      case ActionType.AdminDeclineFarm:
        setIsApproved(false);
        setShowValidationModal(true);
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

  const onClose = () => {
    setShowValidationModal(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  return (
    <>
      <Paper className={style.container}>
        <FarmFilter pageNumber={pageNumber} pageSize={pageSize} />
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

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pageCount}
          rowsPerPage={pageSize}
          page={pageNumber}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

        <FarmValidateModal
          isApproved={isApproved}
          farmId={selectedFarm?.farmId}
          isOpen={showValidationModal}
          onClose={onClose}
        />
      </Paper>
    </>
  );
};

export default FarmList;
