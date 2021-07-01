import {
  createStyles,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import Farm from "../+models/farm";
import moment from "moment";

type FarmListToPrintProps = {
  farms: Farm[];
};

const useStyles = makeStyles(() =>
  createStyles({
    container: { padding: 20 },
    table: {},
    cell: {
      borderBottom: 0,
    },
    title: {
      display: "block",
      fontSize: 20,
      marginTop: 30,
      textAlign: "center",
    },
    subtitle: {
      textAlign: "center",
      display: "block",
      marginBottom: 15,
      fontSize: 12,
    },
  })
);

const FarmListToPrint: React.FC<FarmListToPrintProps> = (props) => {
  const style = useStyles();

  return (
    <div>
      <span className={style.title}>Farms List</span>
      <span className={style.subtitle}>{`as of ${moment().format(
        "MMMM DD, YYYY"
      )}`}</span>
      <Table size="small" className={style.table}>
        <TableHead>
          <TableRow>
            <TableCell className={style.cell}>Farm</TableCell>
            <TableCell className={style.cell}>Farmer</TableCell>
            <TableCell className={style.cell}>Mobile Number</TableCell>
            <TableCell className={style.cell}>Address</TableCell>
            <TableCell className={style.cell}>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.farms.map((farm) => {
            return (
              <TableRow key={farm.farmId}>
                <TableCell className={style.cell}>{farm.farm}</TableCell>
                <TableCell className={style.cell}>{farm.farmer}</TableCell>
                <TableCell
                  className={style.cell}
                >{`+63${farm.mobileNumber}`}</TableCell>
                <TableCell
                  className={style.cell}
                >{`${farm.address}, ${farm.area}, ${farm.barangay}`}</TableCell>

                <TableCell className={style.cell}>{farm.status}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default FarmListToPrint;
