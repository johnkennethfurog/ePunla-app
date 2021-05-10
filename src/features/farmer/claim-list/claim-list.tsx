import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { fetchClaims, selectClaims } from "../farmerSlice";
import {
  makeStyles,
  Theme,
  createStyles,
  MenuItem,
  TextField,
  Grid,
  Typography,
} from "@material-ui/core";
import ClaimRow from "./claim-row";
import useInput from "../../../hooks/useInput";
import { StatusClaimList } from "../models/status-claim.enum";
import { SimpleDropDown } from "../../../components/select/selects";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    table: {},
    searchForm: {
      padding: 15,
      marginBottom: 20,
    },
  })
);

const ClaimList = () => {
  const [status, bindStatus] = useInput("");

  const claims = useSelector(selectClaims);
  const dispatch = useDispatch();
  const style = useStyles();

  useEffect(() => {
    return () => {
      console.log("unmounting");
    };
  }, []);

  useEffect(() => {
    dispatch(fetchClaims(!!status ? status : null));
  }, [status]);

  return (
    <Paper style={{ marginBottom: 20 }}>
      <form className={style.searchForm}>
        <Typography variant="subtitle1" gutterBottom>
          Search Claims
        </Typography>
        <Grid container>
          <Grid item xs={10} sm={4} md={3} lg={2}>
            {/* <SimpleDropDown
              id="status"
              label="Claim Status"
              fullWidth
              bind={bindStatus}
              options={StatusClaimList}
            /> */}
          </Grid>
        </Grid>
      </form>

      <Table className={style.table} aria-label="farm table">
        <TableHead>
          <TableRow>
            <TableCell>Date Filed</TableCell>
            <TableCell>Farm</TableCell>
            <TableCell>Crop</TableCell>
            <TableCell>Damaged Area</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Claim Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {claims.map((claim) => (
            <ClaimRow claim={claim} key={claim.claimId.toString()} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ClaimList;
