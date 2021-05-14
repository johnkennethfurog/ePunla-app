import React from "react";
import { useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import CropRow, { CropRowHeader } from "./crops-row";
import CropsFilter from "./crops-filter";
import { selectCrops } from "../farmerSelectors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 10,
    },
    table: {},
  })
);

const CropList = () => {
  const style = useStyles();
  const crops = useSelector(selectCrops);

  return (
    <Paper className={style.container}>
      <CropsFilter />
      <Table className={style.table} aria-label="farm table">
        <CropRowHeader />
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
