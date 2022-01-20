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
            <TableCell className={style.cell}>Name of Farm</TableCell>
            <TableCell className={style.cell}>Address of Farm</TableCell>
            <TableCell className={style.cell}>Manage By</TableCell>
            <TableCell className={style.cell}>Area Size</TableCell>
            <TableCell className={style.cell}>Date Registerd</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.farms.map((farm) => {
            return (
              <TableRow key={farm.farmId}>
                <TableCell className={style.cell}>{farm.farm}</TableCell>
                <TableCell
                  className={style.cell}
                >{`${farm.address}, ${farm.area}, ${farm.barangay}`}</TableCell>
                <TableCell className={style.cell}>{farm.farmer}</TableCell>
                <TableCell
                  className={style.cell}
                >{`${farm.areaSize.toLocaleString()} sqm.`}</TableCell>

                <TableCell className={style.cell}>
                  {!farm.validationDate
                    ? "-"
                    : moment(farm.validationDate).format("MM-DD-yyyy")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default FarmListToPrint;
