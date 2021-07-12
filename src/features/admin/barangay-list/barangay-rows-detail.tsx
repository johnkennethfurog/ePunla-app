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
import { Barangay } from "../../../models/barangay";

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
    primary: {
      fontSize: 14,
      display: "block",
    },
    secondary: {
      fontSize: 12,
      marginBottom: 10,
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

type BarangayRowDetailProps = {
  barangay: Barangay;
  isOpen: boolean;
};
const BarangayRowDetail = (props: BarangayRowDetailProps) => {
  const { barangay, isOpen } = props;

  const style = useStyles();
  return (
    <TableRow key={barangay.barangayId.toString() + "_detail"}>
      <TableCell className={style.cell}></TableCell>
      <TableCell className={style.cell} colSpan={7}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <div className={style.rootGrid}>
            <h3>Areas: </h3>
            <Grid container>
              {barangay.areas.map((area) => {
                return (
                  <Grid
                    key={area.barangayAreaId.toString()}
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    lg={4}
                    xl={3}
                  >
                    <div>
                      <span className={style.primary}>{area.area}</span>
                      <span
                        className={style.secondary}
                        style={{
                          color: area.areaIsActive ? "green" : "indianred",
                        }}
                      >
                        {area.areaIsActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default BarangayRowDetail;
