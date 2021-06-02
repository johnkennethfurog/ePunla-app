import {
  TableRow,
  TableCell,
  IconButton,
  TableHead,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import Status from "../../../components/status/status";
import { Farm } from "../farmer-models/farm";
import { StatusFarm } from "../farmer-models/status-farm.enum";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { ActionType } from "../../../models/action-type.enum";
import { useDispatch } from "react-redux";
import { doAction } from "../../../app/+states/commonSlice";
import { ActionModule } from "../../../models/action-module.enum";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rowHeader: {
      backgroundColor: "rgb(244, 246, 248)",
    },
    cell: {
      borderBottom: 0,
    },
  })
);

type FarmRowProps = {
  farm: Farm;
};

const FarmRow = (props: FarmRowProps) => {
  const { farm } = props;

  const style = useStyles();
  const dispatch = useDispatch();

  const onEdit = () => {
    dispatchAction(ActionType.UpdateFarm);
  };

  const onDelete = () => {
    dispatchAction(ActionType.DeleteFarm);
  };

  const dispatchAction = (action: ActionType) => {
    dispatch(
      doAction({
        data: farm,
        actionType: action,
        actionModule: ActionModule.FarmerFarmsModule,
      })
    );
  };

  return (
    <TableRow key={farm.farmId}>
      <TableCell className={style.cell}>{farm.name}</TableCell>
      <TableCell className={style.cell}>{farm.areaSize}</TableCell>
      <TableCell className={style.cell}>{farm.streetAddress}</TableCell>
      <TableCell className={style.cell}>{farm.barangay}</TableCell>
      <TableCell className={style.cell}>{farm.barangayArea}</TableCell>
      <TableCell className={style.cell}>
        {
          <Status
            pendingStatus={StatusFarm.Pending}
            cancelledStatus={StatusFarm.Rejected}
            approvedStatus={StatusFarm.Approved}
            status={farm.status}
          />
        }
      </TableCell>
      <TableCell className={style.cell}>
        {farm.status === StatusFarm.Pending && (
          <IconButton onClick={onEdit} aria-label="edit">
            <EditIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export const FarmRowHeader = () => {
  const style = useStyles();
  return (
    <TableHead>
      <TableRow className={style.rowHeader}>
        <TableCell>Name</TableCell>
        <TableCell>Area Size</TableCell>
        <TableCell>Address</TableCell>
        <TableCell>Barangay</TableCell>
        <TableCell>Area</TableCell>
        <TableCell>Status</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default FarmRow;
