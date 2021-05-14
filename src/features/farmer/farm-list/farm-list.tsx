import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { fetchFarms, selectFarms } from "../farmerSlice";
import { useHistory } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import FarmRow, { FarmRowHeader } from "./farm-rows";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 10,
    },
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
    <Paper className={style.container}>
      <Table className={style.table} aria-label="farm table">
        <FarmRowHeader />
        <TableBody>
          {farms.map((farm) => (
            <FarmRow farm={farm} key={farm.farmId.toString()} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default FarmList;
