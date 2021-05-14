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

import { Crop } from "../models/crop";
import { StatusCrop } from "../models/status-crop.enum";

import moment from "moment";

type CropRowProps = {
  crop: Crop;
};

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

const CropRow = (props: CropRowProps) => {
  const style = useStyles();
  const { crop } = props;

  const onClickView = () => {};

  return (
    <TableRow key={crop.farmCropId}>
      <TableCell className={style.cell}>
        {moment(crop.plantedDate).format("MM-DD-YYYY")}
      </TableCell>
      <TableCell className={style.cell}>{crop.crop}</TableCell>
      <TableCell className={style.cell}>{crop.category}</TableCell>
      <TableCell className={style.cell}>{crop.farm}</TableCell>
      <TableCell className={style.cell}>{crop.areaSize} sqm.</TableCell>
      <TableCell className={style.cell}>
        {
          <Status
            pendingStatus={StatusCrop.Planted}
            cancelledStatus={StatusCrop.Damaged}
            approvedStatus={StatusCrop.Harvested}
            status={crop.status}
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

export default CropRow;
