import { TableRow, TableCell, IconButton } from "@material-ui/core";
import React from "react";
import Status from "../../../components/status/status";
import { Farm } from "../models/farm";
import { StatusFarm } from "../models/status-farm.enum";
import EditIcon from "@material-ui/icons/Edit";

type FarmRowProps = {
  farm: Farm;
};

const FarmRow = (props: FarmRowProps) => {
  const { farm } = props;

  const onClickView = () => {};

  return (
    <TableRow key={farm.farmId}>
      <TableCell>{farm.name}</TableCell>
      <TableCell>{farm.areaSize}</TableCell>
      <TableCell>{farm.streetAddress}</TableCell>
      <TableCell>{farm.barangay}</TableCell>
      <TableCell>{farm.barangayArea}</TableCell>
      <TableCell>
        {
          <Status
            pendingStatus={StatusFarm.Pending}
            cancelledStatus={StatusFarm.Rejected}
            approvedStatus={StatusFarm.Approved}
            status={farm.status}
          />
        }
      </TableCell>
      <TableCell>
        <IconButton onClick={onClickView} aria-label="edit">
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default FarmRow;
