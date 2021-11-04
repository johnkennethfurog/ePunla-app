import {
  TableRow,
  TableCell,
  Collapse,
  createStyles,
  makeStyles,
  Theme,
  Hidden,
  Grid,
} from "@material-ui/core";
import React from "react";
import { Farm } from "../+models/farm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      border: 0,
    },
    rootGrid: {
      borderBottom: 1,
      borderBottomColor: theme.palette.primary.dark,
      borderBottomStyle: "solid"!,
      display: "flex",
      flexDirection: "column",
      paddingBottom: 10,
    },
    label: {
      fontWeight: "bold",
      marginTop: 10,
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

type FarmRowDetailProps = {
  farm: Farm;
  isOpen: boolean;
};
const FarmRowDetail = (props: FarmRowDetailProps) => {
  const { farm, isOpen } = props;

  const style = useStyles();
  return (
    <TableRow key={farm.farmId.toString() + "_detail"}>
      <TableCell className={style.cell}></TableCell>
      <TableCell className={style.cell} colSpan={7}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Grid container className={style.rootGrid} spacing={5}>
            {/* ATTACHED IMAGE */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <img className={style.image} src={farm.imageUrl} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Hidden mdUp>
                <div className={style.rootGrid}>
                  <span className={style.label}>Area Size:</span>
                  <span>{farm.areaSize} sqm.</span>
                  <span className={style.label}>Address:</span>
                  <span>{farm.streetAddress}</span>
                  <span className={style.label}>Barangay:</span>
                  <span>{farm.barangay}</span>
                  <span className={style.label}>Barangay Area:</span>
                  <span>{farm.barangayArea}</span>
                </div>
              </Hidden>
            </Grid>
          </Grid>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default React.memo(FarmRowDetail);
