import {
  TableRow,
  TableCell,
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core";
import moment from "moment";
import React from "react";

import { CropOccurance } from "../+models/crop-occurance";

type CropRowProps = {
  crop: CropOccurance;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      borderBottom: 0,
    },
  })
);

const CropRow = ({ crop }: CropRowProps) => {
  const style = useStyles();
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell className={style.cell}>
        {moment(crop.plantedDate).format("MM-DD-yyyy")}
      </TableCell>
      <TableCell className={style.cell}>{crop.crop}</TableCell>
      <TableCell className={style.cell}>{crop.farmer}</TableCell>
      <TableCell className={style.cell}>{crop.farm}</TableCell>
      <TableCell className={style.cell}>{`${crop.areaSize} sqm.`}</TableCell>
    </TableRow>
  );
};

export default CropRow;
