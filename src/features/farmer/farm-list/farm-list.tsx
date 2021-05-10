import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { fetchFarms, selectFarms } from "../farmerSlice";
import { useHistory } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import FarmRow from "./farm-rows";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    table: {},
  })
);

const FarmList = () => {
  const farms = useSelector(selectFarms);
  const dispatch = useDispatch();
  const history = useHistory();
  const style = useStyles();

  useEffect(() => {
    dispatch(fetchFarms());

    return () => {
      console.log("unmounting");
    };
  }, []);

  return (
    <TableContainer className={style.container} component={Paper}>
      <Table className={style.table} aria-label="farm table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Area Size</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Barangay</TableCell>
            <TableCell>Area</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {farms.map((farm) => (
            <FarmRow farm={farm} key={farm.farmId.toString()} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FarmList;
