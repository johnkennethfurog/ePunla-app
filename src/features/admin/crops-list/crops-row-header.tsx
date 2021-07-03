import {
  TableRow,
  TableCell,
  createStyles,
  makeStyles,
  Theme,
  TableHead,
  Hidden,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rowHeader: {
      backgroundColor: "rgb(244, 246, 248)",
    },
  })
);

export const CropRowHeader = () => {
  const style = useStyles();

  return (
    <TableHead>
      <TableRow className={style.rowHeader}>
        <Hidden mdUp>
          <TableCell></TableCell>
        </Hidden>
        <Hidden smDown>
          <TableCell>Category</TableCell>
        </Hidden>
        <TableCell>Crop</TableCell>
        <Hidden smDown>
          <TableCell>Duration</TableCell>
        </Hidden>

        <TableCell>Status</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CropRowHeader;
