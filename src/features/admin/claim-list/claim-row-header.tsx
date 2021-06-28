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
        </Hidden>
        <TableCell>Farm</TableCell>
        <Hidden smDown>
          <TableCell>Crop</TableCell>
          <TableCell>Damaged Area</TableCell>
        </Hidden>
        <TableCell>Status</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ClaimRowHeader;
