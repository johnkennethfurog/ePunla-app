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
        <TableCell>Planted Date</TableCell>
        <TableCell>Crop</TableCell>
        <TableCell>Farmer</TableCell>
        <TableCell>Farm</TableCell>
        <TableCell>Area Size</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CropRowHeader;
