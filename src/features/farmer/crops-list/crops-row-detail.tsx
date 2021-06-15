import {
  TableRow,
  TableCell,
  Collapse,
  createStyles,
  makeStyles,
  Theme,
  Grid,
} from "@material-ui/core";
import React from "react";
import moment from "moment";

import { FarmCrop } from "../+models/farm-crop";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      border: 0,
    },
    rootGrid: {
      borderBottom: 1,
      borderBottomColor: theme.palette.primary.dark,
      borderBottomStyle: "solid"!,

      paddingBottom: 10,
    },
    label: {
      fontWeight: "bold",
      marginTop: 10,
      display: "block",
    },
    image: {
      objectFit: "cover",
      width: "100%",
      height: 250,
    },
    detailPlaceholder: {
      fontStyle: "italic",
    },
  })
);

type CropRowDetailProps = {
  crop: FarmCrop;
  isOpen: boolean;
};
const CropRowDetail = (props: CropRowDetailProps) => {
  const { crop, isOpen } = props;

  const style = useStyles();
  return (
    <TableRow key={crop.cropId.toString() + "_detail"}>
      <TableCell className={style.cell}></TableCell>
      <TableCell className={style.cell} colSpan={7}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Grid container spacing={2} className={style.rootGrid}>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <span className={style.label}>Date Planted:</span>
              <span> {moment(crop.plantedDate).format("MM-DD-YYYY")}</span>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <span className={style.label}>Farm:</span>
              <span>{crop.farm}</span>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <span className={style.label}>Area Size:</span>
              <span>{crop.areaSize} sqm.</span>
            </Grid>
          </Grid>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default CropRowDetail;
