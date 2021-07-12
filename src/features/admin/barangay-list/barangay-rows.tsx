import {
  TableRow,
  TableCell,
  IconButton,
  TableHead,
  createStyles,
  makeStyles,
  Theme,
  Hidden,
  useTheme,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React from "react";
import { Barangay } from "../../../models/barangay";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

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

type BarangayRowProps = {
  barangay: Barangay;
  isOpen: boolean;
};

const BarangayRow = (props: BarangayRowProps) => {
  const { barangay, isOpen } = props;

  const style = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();

  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onEdit = () => {
    dispatchAction(ActionType.AdminUpdateBarangay, barangay);
    onCloseMenu();
  };

  const onUpdateStatus = () => {
    dispatchAction(ActionType.AdminUpdateStatusBarangay, barangay);
    onCloseMenu();
  };

  const dispatchAction = (
    action: ActionType,
    data: Barangay,
    expand?: boolean
  ) => {
    dispatch(
      doAction({
        data,
        actionType: action,
        actionModule: ActionModule.AdminBarangaysModule,
        expand,
      })
    );
  };

  const onExpand = () => {
    dispatchAction(
      ActionType.AdminExpandCollapsedBarangay,
      isOpen ? null : barangay,
      !isOpen
    );
  };

  return (
    <TableRow key={barangay.barangayId}>
      <TableCell className={style.cell}>
        <IconButton aria-label="expand row" size="small" onClick={onExpand}>
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell className={style.cell}>{barangay.barangay}</TableCell>
      <TableCell
        className={style.cell}
        style={{
          color: barangay.isActive ? "green" : "indianred",
        }}
      >
        {barangay.isActive ? "Active" : "Inactive"}
      </TableCell>
      <TableCell className={style.cell}>
        <IconButton onClick={onOpenMenu} size="small" aria-label="edit">
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={onCloseMenu}
        >
          <MenuItem onClick={onEdit}>Edit</MenuItem>
          <MenuItem onClick={onUpdateStatus}>
            {barangay.isActive ? "Deactivate" : "Activate"}
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export const BarangayRowHeader = () => {
  const style = useStyles();
  return (
    <TableHead>
      <TableRow className={style.rowHeader}>
        <TableCell></TableCell>
        <TableCell>Barangay</TableCell>
        <TableCell>Status</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default BarangayRow;
