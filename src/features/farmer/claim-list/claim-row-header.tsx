import { Hidden } from "@material-ui/core";
import {
  makeStyles,
  Theme,
  createStyles,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rowHeader: {
      backgroundColor: "rgb(244, 246, 248)",
    },
  })
);

const ClaimRowHeader = () => {
  const style = useStyles();

  return (
    <TableHead className={style.rowHeader}>
      <TableRow>
        <TableCell></TableCell>
        <Hidden smDown>
          <TableCell>Date Filed</TableCell>
          <TableCell>Farm</TableCell>
        </Hidden>
        <TableCell>Crop</TableCell>
        <Hidden smDown>
          <TableCell>Damaged Area</TableCell>
        </Hidden>
        <TableCell>Status</TableCell>
        <TableCell>Action Date</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ClaimRowHeader;
