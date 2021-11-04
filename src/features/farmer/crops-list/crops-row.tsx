import {
  TableRow,
  TableCell,
  IconButton,
  createStyles,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { useEffect } from "react";
import Status from "../../../components/status/status";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { FarmCrop } from "../+models/farm-crop";
import { StatusCrop } from "../+models/status-crop.enum";

import moment from "moment";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../models/action-type.enum";
import { doAction } from "../../../app/+states/commonSlice";
import { ActionModule } from "../../../models/action-module.enum";
import { Hidden } from "@material-ui/core";

type CropRowProps = {
  crop: FarmCrop;
  isOpen: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      borderBottom: 0,
    },
  })
);

const CropRow = (props: CropRowProps) => {
  const { crop, isOpen } = props;

  const style = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();

  useEffect(() => {
    dispatchAction(ActionType.ExpandCollapsedCrops, null, false);
  }, [isBigScreen]);

  const onHarvest = () => {
    dispatchAction(ActionType.HarvestCrops, crop);
    onCloseMenu();
  };

  const onEdit = () => {
    dispatchAction(ActionType.UpdateCrops, crop);
    onCloseMenu();
  };

  const onDelete = () => {
    dispatchAction(ActionType.DeleteCrops, crop);
    onCloseMenu();
  };

  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatchAction = (
    action: ActionType,
    data: FarmCrop,
    expand?: boolean
  ) => {
    dispatch(
      doAction({
        data,
        actionType: action,
        actionModule: ActionModule.FarmerCropsModule,
        expand,
      })
    );
  };

  const onExpand = () => {
    dispatchAction(
      ActionType.ExpandCollapsedCrops,
      isOpen ? null : crop,
      !isOpen
    );
  };

  return (
    <TableRow key={crop.farmCropId}>
      <Hidden mdUp>
        <TableCell className={style.cell}>
          <IconButton aria-label="expand row" size="small" onClick={onExpand}>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </Hidden>

      <Hidden smDown>
        <TableCell className={style.cell}>
          {moment(crop.plantedDate).format("MM-DD-YYYY")}
        </TableCell>
      </Hidden>
      <TableCell className={style.cell}>{crop.crop}</TableCell>
      <Hidden smDown>
        <TableCell className={style.cell}>{crop.farm}</TableCell>
        <TableCell className={style.cell}>{crop.areaSize} sqm.</TableCell>
      </Hidden>
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
      <Hidden smDown>
        <TableCell className={style.cell}>
          {crop.actionDate ? moment(crop.actionDate).format("MM-DD-YYYY") : ""}
        </TableCell>
      </Hidden>
      <TableCell className={style.cell}>
        {crop.status === StatusCrop.Planted && (
          <>
            <IconButton onClick={onOpenMenu} aria-label="edit">
              <MoreVertIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={onCloseMenu}
            >
              <MenuItem onClick={onEdit}>Edit</MenuItem>
              <MenuItem onClick={onHarvest}>Harvest</MenuItem>
              <MenuItem onClick={onDelete}>Delete</MenuItem>
            </Menu>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default React.memo(CropRow);
