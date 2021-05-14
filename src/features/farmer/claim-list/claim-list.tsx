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
  Grid,
  Typography,
} from "@material-ui/core";
import ClaimRow, { ClaimRowHeader } from "./claim-row";
import useInput from "../../../hooks/useInput";
import { StatusClaimList } from "../models/status-claim.enum";
import { SimpleDropDown } from "../../../components/select/selects";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 10,
    },
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
    <Paper className={style.container}>
      <form className={style.searchForm}>
        <Typography variant="subtitle1" gutterBottom>
          Search Claims
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SimpleDropDown
              id="status"
              label="Claim Status"
              fullWidth
              bind={bindStatus}
              options={StatusClaimList}
            />
          </Grid>
        </Grid>
      </form>

      <Table className={style.table} aria-label="farm table">
        <ClaimRowHeader />
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
