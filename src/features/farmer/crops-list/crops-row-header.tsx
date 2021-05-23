import {
  TableRow,
  TableCell,
  createStyles,
  makeStyles,
  Theme,
  TableHead,
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
        <TableCell>Date Planted</TableCell>
        <TableCell>Crop</TableCell>
        <TableCell>Category</TableCell>
        <TableCell>Farm</TableCell>
        <TableCell>Area Size</TableCell>
        <TableCell>Crop Status</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CropRowHeader;
