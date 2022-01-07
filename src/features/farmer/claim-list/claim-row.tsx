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

import { Claim } from "../+models/claim";
import { StatusClaim } from "../../../models/status-claim.enum";
import moment from "moment";
import { selectClaim } from "../+state/farmerSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      borderBottom: 0,
    },
  })
);

type ClaimRowProps = {
  claim: Claim;
  onExpand: () => void;
  onDelete: (claimId: number) => void;
  isOpen: boolean;
};

const ClaimRow = (props: ClaimRowProps) => {
  const { claim, onExpand, isOpen, onDelete } = props;

  const style = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();

  const editClaim = () => {
    dispatch(selectClaim(claim));
    onCloseMenu();
  };

  const deleteClaim = () => {
    onDelete(claim.claimId);
    onCloseMenu();
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
          {claim.referenceNumber ?? "-"}
        </TableCell>
        <TableCell className={style.cell}>
          {moment(claim.filingDate).format("MM-DD-YYYY")}
        </TableCell>
        <TableCell className={style.cell}>{claim.farm}</TableCell>
      </Hidden>
      <TableCell className={style.cell}>{claim.crop}</TableCell>
      <Hidden smDown>
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
        {claim.validationDate
          ? moment(claim.validationDate).format("MM-DD-YYYY")
          : "-"}
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
              <MenuItem onClick={editClaim}>Edit</MenuItem>
              <MenuItem onClick={deleteClaim}>Delete</MenuItem>
            </Menu>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ClaimRow;
