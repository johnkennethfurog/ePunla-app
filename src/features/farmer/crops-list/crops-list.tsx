import React from "react";
import { useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import { selectCrops } from "../farmerSlice";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import CropRow, { CropRowHeader } from "./crops-row";
import CropsFilter from "./crops-filter";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    table: {},
  })
);

const CropList = () => {
  const style = useStyles();
  const crops = useSelector(selectCrops);

  return (
    <Paper>
      <CropsFilter />
      <Table className={style.table} aria-label="farm table">
        <TableHead>
          <CropRowHeader />
        </TableHead>
        <TableBody>
          {crops.map((crop) => (
            <CropRow crop={crop} key={crop.farmCropId.toString()} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default CropList;
