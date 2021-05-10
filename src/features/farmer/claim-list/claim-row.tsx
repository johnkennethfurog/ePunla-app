import { TableRow, TableCell, IconButton } from "@material-ui/core";
import React from "react";
import Status from "../../../components/status/status";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { Claim } from "../models/claim";
import { StatusClaim } from "../models/status-claim.enum";

type ClaimRowProps = {
  claim: Claim;
};

const ClaimRow = (props: ClaimRowProps) => {
  const { claim } = props;

  const onClickView = () => {};

  return (
    <TableRow key={claim.claimId}>
      <TableCell>{claim.filingDate}</TableCell>
      <TableCell>{claim.farm}</TableCell>
      <TableCell>{claim.crop}</TableCell>
      <TableCell>{claim.damagedArea}</TableCell>
      <TableCell>{claim.description}</TableCell>
      <TableCell>
        {
          <Status
            pendingStatus={StatusClaim.Pending}
            cancelledStatus={StatusClaim.Denied}
            approvedStatus={StatusClaim.Claimed}
            status={claim.status}
          />
        }
      </TableCell>
      <TableCell>
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

export default ClaimRow;
