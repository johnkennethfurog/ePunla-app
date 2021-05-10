import { TableRow, TableCell, IconButton } from "@material-ui/core";
import React from "react";
import Status from "../../../components/status/status";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { Crop } from "../models/crop";
import { StatusCrop } from "../models/status-crop.enum";

type CropRowProps = {
  crop: Crop;
};

const CropRow = (props: CropRowProps) => {
  const { crop } = props;

  const onClickView = () => {};

  return (
    <TableRow key={crop.farmCropId}>
      <TableCell>{crop.plantedDate}</TableCell>
      <TableCell>{crop.crop}</TableCell>
      <TableCell>{crop.category}</TableCell>
      <TableCell>{crop.farm}</TableCell>
      <TableCell>{crop.areaSize} sqm.</TableCell>
      <TableCell>
        {
          <Status
            pendingStatus={StatusCrop.Planted}
            cancelledStatus={StatusCrop.Damaged}
            approvedStatus={StatusCrop.Harvested}
            status={crop.status}
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

export const CropRowHeader = () => {
  return (
    <TableRow>
      <TableCell>Date Planted</TableCell>
      <TableCell>Crop</TableCell>
      <TableCell>Category</TableCell>
      <TableCell>Farm</TableCell>
      <TableCell>Area Size</TableCell>
      <TableCell>Crop Status</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default CropRow;
