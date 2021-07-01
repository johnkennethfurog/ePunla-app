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
import Claim from "../+models/claim";
import moment from "moment";
import { DamageCause } from "../../farmer/+models/claim";

type ClaimListToPrintProps = {
  claims: Claim[];
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

const getCauseOfDamage = (causes: DamageCause[]): string => {
  return causes
    .filter((x) => x.damagedAreaSize > 0)
    .map((x) => `${x.damageType} (${x.damagedAreaSize} sqm.)`)
    .join(", ");
};

const ClaimListToPrint: React.FC<ClaimListToPrintProps> = (props) => {
  const style = useStyles();

  return (
    <div>
      <span className={style.title}>Claims List</span>
      <span className={style.subtitle}>{`as of ${moment().format(
        "MMMM DD, YYYY"
      )}`}</span>
      <Table size="small" className={style.table}>
        <TableHead>
          <TableRow>
            <TableCell className={style.cell}>Date Filed</TableCell>
            <TableCell className={style.cell}>Farm</TableCell>
            <TableCell className={style.cell}>Farmer</TableCell>
            <TableCell className={style.cell}>Mobile Number</TableCell>
            <TableCell className={style.cell}>Crop</TableCell>
            <TableCell className={style.cell}>Cause of Damage</TableCell>
            <TableCell className={style.cell}>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.claims.map((claim) => {
            return (
              <TableRow key={claim.claimId}>
                <TableCell className={style.cell}>
                  {moment(claim.filingDate).format("MM-DD-YYYY")}
                </TableCell>
                <TableCell className={style.cell}>{claim.farm}</TableCell>
                <TableCell className={style.cell}>{`${claim.lastName}, ${
                  claim.firstName
                } ${!!claim.middleName ? claim.middleName : ""}`}</TableCell>
                <TableCell
                  className={style.cell}
                >{`+63${claim.mobileNumber}`}</TableCell>
                <TableCell className={style.cell}>{claim.crop}</TableCell>
                <TableCell className={style.cell}>
                  {getCauseOfDamage(claim.damageCause)}
                </TableCell>
                <TableCell className={style.cell}>{claim.status}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClaimListToPrint;
