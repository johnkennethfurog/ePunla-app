import {
  TableRow,
  TableCell,
  IconButton,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import Status from "../../../components/status/status";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { Claim } from "../farmer-models/claim";
import { StatusClaim } from "../farmer-models/status-claim.enum";
import moment from "moment";
import { selectClaim } from "../farmerSlice";
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

  const onClickView = () => {
    dispatch(selectClaim(claim));
  };

  return (
    <TableRow key={claim.claimId}>
      <TableCell className={style.cell}>
        <IconButton aria-label="expand row" size="small" onClick={onExpand}>
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>

      <TableCell className={style.cell}>
        {moment(claim.filingDate).format("MM-DD-YYYY")}
      </TableCell>
      <TableCell className={style.cell}>{claim.farm}</TableCell>
      <TableCell className={style.cell}>{claim.crop}</TableCell>
      <TableCell className={style.cell}>{claim.damagedArea}</TableCell>
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
            <IconButton onClick={onClickView} aria-label="edit">
              <EditIcon />
            </IconButton>

            <IconButton
              onClick={() => onDelete(claim.claimId)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ClaimRow;
