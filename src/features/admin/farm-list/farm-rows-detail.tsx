import {
  TableRow,
  TableCell,
  Collapse,
  createStyles,
  makeStyles,
  Theme,
  Grid,
  Hidden,
} from "@material-ui/core";
import React from "react";
import Farm from "../+models/farm";
import Status from "../../../components/status/status";
import { StatusFarm } from "../../../models/status-farm.enum";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      border: 0,
    },
    rootGrid: {
      borderBottom: 2,
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
          <Grid container className={style.rootGrid} spacing={2}>
            {/* FARM DETAIL */}
            <Hidden mdUp>
              <Grid item xs={12} sm={12}>
                <span className={style.label}>Area Size:</span>
                <span>{farm.areaSize} sqm.</span>
                <span className={style.label}>Address:</span>
                <span>{farm.address}</span>
                <span className={style.label}>Barangay:</span>
                <span>{farm.barangay}</span>
                <span className={style.label}>Barangay Area:</span>
                <span>{farm.area}</span>
              </Grid>
            </Hidden>
            {/* FARMER DETAIL */}
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <span className={style.label}>Farmer:</span>
              <span>{farm.farmer} </span>
              <span className={style.label}>Mobile Number :</span>
              <span>+63{farm.mobileNumber}</span>
              <span className={style.label}>Farmer Status:</span>
              <span>
                <Status
                  pendingStatus={StatusFarm.Pending}
                  cancelledStatus={StatusFarm.Rejected}
                  approvedStatus={StatusFarm.Approved}
                  status={farm.status}
                />
              </span>
            </Grid>

            {/* FARMER DETAIL */}
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <span className={style.label}>Farmer Address:</span>
              <span>{farm.farmerAddress}</span>
              <span className={style.label}>Farmer Barangay:</span>
              <span>{farm.farmerBarangay}</span>
              <span className={style.label}>Farmer Barangay Area:</span>
              <span>{farm.farmerArea}</span>
            </Grid>
          </Grid>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default FarmRowDetail;
