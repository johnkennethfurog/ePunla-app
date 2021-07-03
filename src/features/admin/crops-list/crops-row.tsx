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

import MoreVertIcon from "@material-ui/icons/MoreVert";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { Crop } from "../+models/crop";

import { useDispatch } from "react-redux";
import { ActionType } from "../../../models/action-type.enum";
import { doAction } from "../../../app/+states/commonSlice";
import { ActionModule } from "../../../models/action-module.enum";
import { Hidden } from "@material-ui/core";

type CropRowProps = {
  crop: Crop;
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

  const onEdit = () => {
    dispatchAction(ActionType.AdminUpdateCrops, crop);
    onCloseMenu();
  };

  const onDelete = () => {
    dispatchAction(ActionType.AdminDeleteCrops, crop);
    onCloseMenu();
  };

  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatchAction = (action: ActionType, data: Crop, expand?: boolean) => {
    dispatch(
      doAction({
        data,
        actionType: action,
        actionModule: ActionModule.AdminCropsModule,
        expand,
      })
    );
  };

  const onExpand = () => {
    dispatchAction(
      ActionType.AdminExpandCollapsedCrops,
      isOpen ? null : crop,
      !isOpen
    );
  };

  return (
    <TableRow key={crop.cropId}>
      <Hidden mdUp>
        <TableCell className={style.cell}>
          <IconButton aria-label="expand row" size="small" onClick={onExpand}>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </Hidden>

      <Hidden smDown>
        <TableCell className={style.cell}>{crop.category}</TableCell>
      </Hidden>
      <TableCell className={style.cell}>{crop.crop}</TableCell>
      <Hidden smDown>
        <TableCell className={style.cell}>{crop.duration} day(s)</TableCell>
      </Hidden>
      <TableCell className={style.cell}>
        {crop.isActive ? "Active" : "Inactive"}
      </TableCell>
      <TableCell className={style.cell}>
        {crop.isActive && (
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
              <MenuItem onClick={onDelete}>Delete</MenuItem>
            </Menu>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default CropRow;
