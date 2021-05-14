import {
  TableRow,
  TableCell,
  IconButton,
  createStyles,
  makeStyles,
  Theme,
  TableHead,
} from "@material-ui/core";
import React from "react";
import Status from "../../../components/status/status";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { Claim } from "../models/claim";
import { StatusClaim } from "../models/status-claim.enum";
import moment from "moment";

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

type ClaimRowProps = {
  claim: Claim;
};

const ClaimRow = (props: ClaimRowProps) => {
  const style = useStyles();
  const { claim } = props;

  const onClickView = () => {};

  return (
    <TableRow key={claim.claimId}>
      <TableCell className={style.cell}>
        {moment(claim.filingDate).format("MM-DD-YYYY")}
      </TableCell>
      <TableCell className={style.cell}>{claim.farm}</TableCell>
      <TableCell className={style.cell}>{claim.crop}</TableCell>
      <TableCell className={style.cell}>{claim.damagedArea}</TableCell>
      <TableCell className={style.cell}>{claim.description}</TableCell>
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
        <IconButton onClick={onClickView} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={onClickView} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export const ClaimRowHeader = () => {
  const style = useStyles();

  return (
    <TableHead className={style.rowHeader}>
      <TableRow>
        <TableCell>Date Filed</TableCell>
        <TableCell>Farm</TableCell>
        <TableCell>Crop</TableCell>
        <TableCell>Damaged Area</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Claim Status</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ClaimRow;
