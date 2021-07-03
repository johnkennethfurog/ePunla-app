import {
  TableRow,
  TableCell,
  IconButton,
  createStyles,
  makeStyles,
  Theme,
  Hidden,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React from "react";
import Status from "../../../components/status/status";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import Claim from "../+models/claim";
import { StatusClaim } from "../../../models/status-claim.enum";
import moment from "moment";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../models/action-type.enum";
import { doAction } from "../../../app/+states/commonSlice";
import { ActionModule } from "../../../models/action-module.enum";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      borderBottom: 0,
    },
  })
);

type ClaimRowProps = {
  claim: Claim;
  isOpen: boolean;
};

const ClaimRow = (props: ClaimRowProps) => {
  const { claim, isOpen } = props;

  const style = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();

  const approveClaim = () => {
    dispatchAction(ActionType.AdminApproveClaim, claim);
    onCloseMenu();
  };

  const declineClaim = () => {
    dispatchAction(ActionType.AdminDeclineClaim, claim);
    onCloseMenu();
  };

  const dispatchAction = (
    action: ActionType,
    data: Claim,
    expand?: boolean
  ) => {
    dispatch(
      doAction({
        data,
        actionType: action,
        actionModule: ActionModule.AdminClaimsModile,
        expand,
      })
    );
  };

  const onExpand = () => {
    dispatchAction(
      ActionType.AdminExpandCollapsedClaim,
      isOpen ? null : claim,
      !isOpen
    );
  };

  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <TableRow key={claim.claimId}>
      <TableCell className={style.cell}>
        <IconButton aria-label="expand row" size="small" onClick={onExpand}>
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <Hidden smDown>
        <TableCell className={style.cell}>
          {moment(claim.filingDate).format("MM-DD-YYYY")}
        </TableCell>
      </Hidden>
      <TableCell className={style.cell}>{claim.farm}</TableCell>
      <Hidden smDown>
        <TableCell className={style.cell}>{claim.crop}</TableCell>
        <TableCell className={style.cell}>{claim.damagedArea}</TableCell>
      </Hidden>
      <TableCell className={style.cell}>
        {
          <Status
            pendingStatus={StatusClaim.Pending}
            cancelledStatus={StatusClaim.Denied}
            approvedStatus={StatusClaim.Claimed}
            status={claim.status}
          />
        }
      </TableCell>
      <TableCell className={style.cell}>
        {claim.status === StatusClaim.Pending && (
          <>
            <IconButton onClick={onOpenMenu} aria-label="edit">
              <MoreVertIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={onCloseMenu}
            >
              <MenuItem onClick={approveClaim}>Approve</MenuItem>
              <MenuItem onClick={declineClaim}>Decline</MenuItem>
            </Menu>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ClaimRow;
