import {
  TableRow,
  TableCell,
  IconButton,
  TableHead,
  createStyles,
  makeStyles,
  Theme,
  useMediaQuery,
  Hidden,
  useTheme,
} from "@material-ui/core";
import React from "react";
import Status from "../../../components/status/status";
import Farm from "../+models/farm";
import { StatusFarm } from "../../../models/status-farm.enum";

import EditIcon from "@material-ui/icons/Edit";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { ActionType } from "../../../models/action-type.enum";
import { useDispatch } from "react-redux";
import { doAction } from "../../../app/+states/commonSlice";
import { ActionModule } from "../../../models/action-module.enum";
import { useEffect } from "react";

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
  isOpen: boolean;
};

const FarmRow = (props: FarmRowProps) => {
  const { farm, isOpen } = props;

  const style = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    dispatchAction(ActionType.ExpandCollapsedFarm, null, false);
  }, [isBigScreen]);

  const onApprove = () => {
    dispatchAction(ActionType.AdminApproveFarm, farm);
  };

  const onDecline = () => {
    dispatchAction(ActionType.AdminDeclineFarm, farm);
  };

  const dispatchAction = (action: ActionType, data: Farm, expand?: boolean) => {
    dispatch(
      doAction({
        data,
        actionType: action,
        actionModule: ActionModule.AdminFarmsModule,
        expand,
      })
    );
  };

  const onExpand = () => {
    dispatchAction(
      ActionType.AdminExpandCollapsedFarm,
      isOpen ? null : farm,
      !isOpen
    );
  };

  return (
    <TableRow key={farm.farmId}>
      <Hidden mdUp>
        <TableCell className={style.cell}>
          <IconButton aria-label="expand row" size="small" onClick={onExpand}>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </Hidden>

      <TableCell className={style.cell}>{farm.farm}</TableCell>
      <Hidden smDown>
        <TableCell className={style.cell}>{farm.areaSize}</TableCell>
        <TableCell className={style.cell}>{farm.address}</TableCell>
        <TableCell className={style.cell}>{farm.barangay}</TableCell>
        <TableCell className={style.cell}>{farm.area}</TableCell>
      </Hidden>
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
          <IconButton onClick={onApprove} aria-label="edit">
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
        <Hidden mdUp>
          <TableCell></TableCell>
        </Hidden>
        <TableCell>Name</TableCell>
        <Hidden smDown>
          <TableCell>Area Size</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Barangay</TableCell>
          <TableCell>Area</TableCell>
        </Hidden>
        <TableCell>Status</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default FarmRow;