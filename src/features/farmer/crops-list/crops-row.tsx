import {
  TableRow,
  TableCell,
  IconButton,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import Status from "../../../components/status/status";

import PanToolIcon from "@material-ui/icons/PanTool";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { FarmCrop } from "../farmer-models/farm-crop";
import { StatusCrop } from "../farmer-models/status-crop.enum";

import moment from "moment";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../models/action-type.enum";
import { doAction } from "../../../app/commonSlice";
import { ActionModule } from "../../../models/action-module.enum";

type CropRowProps = {
  crop: FarmCrop;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      borderBottom: 0,
    },
  })
);

const CropRow = (props: CropRowProps) => {
  const { crop } = props;

  const style = useStyles();
  const dispatch = useDispatch();

  const onHarvest = () => {
    dispatchAction(ActionType.HarvestCrops);
  };

  const onEdit = () => {
    dispatchAction(ActionType.UpdateCrops);
  };

  const onDelete = () => {
    dispatchAction(ActionType.DeleteCrops);
  };

  const dispatchAction = (action: ActionType) => {
    dispatch(
      doAction({
        data: crop,
        actionType: action,
        actionModule: ActionModule.FarmerCropsModule,
      })
    );
  };

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
        {crop.status === StatusCrop.Planted && (
          <>
            <IconButton onClick={onEdit} aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={onDelete} aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={onHarvest} aria-label="harvest">
              <PanToolIcon />
            </IconButton>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default CropRow;
