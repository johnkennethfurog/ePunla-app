import { Hidden } from "@material-ui/core";
import {
  Box,
  Collapse,
  createStyles,
  Grid,
  makeStyles,
  TableCell,
  TableRow,
  Theme,
} from "@material-ui/core";
import React from "react";
import Claim from "../+models/claim";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      border: 0,
    },
    rootGrid: {
      borderBottom: 2,
      borderBottomColor: theme.palette.primary.dark,
      borderBottomStyle: "solid"!,
    },
    label: {
      fontWeight: "bold",
      display: "block",
      marginTop: 15,
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

type ClaimRowDetailProps = {
  claim: Claim;
  isOpen: boolean;
};

const ClaimRowDetail = (props: ClaimRowDetailProps) => {
  const style = useStyles();
  const { claim, isOpen } = props;
  return (
    <TableRow key={claim.claimId.toString() + "_detail"}>
      <TableCell className={style.cell} colSpan={7}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Grid container className={style.rootGrid} spacing={2}>
            {/* ATTACHED IMAGE */}
            <Grid item xs={12} sm={12} md={4} lg={4}>
              {!claim.photoUrl && (
                <p className={style.detailPlaceholder}> No attached image. </p>
              )}
              {!!claim.photoUrl && (
                <img className={style.image} src={claim.photoUrl} />
              )}
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Hidden mdUp>
                {/* REFERENCE NUMBER */}
                <span className={style.label}>Reference Number:</span>
                <span>{claim?.referenceNumber ?? "-"}</span>

                {/* DATE FILED */}
                <span className={style.label}>Date Filed:</span>
                <span>{moment(claim.filingDate).format("MM-DD-YYYY")}</span>

                {/* CROP */}
                <span className={style.label}>Crop:</span>
                <span>{claim.crop}</span>

                {/* Damaged Area */}
                <span className={style.label}>Damaged Area:</span>
                <span>{claim.damagedArea}</span>
              </Hidden>

              <span className={style.label}>Description:</span>
              {!!claim.description && <p>{claim.description}</p>}
              {!claim.description && (
                <p className={style.detailPlaceholder}>
                  No Description provided.
                </p>
              )}
              <span className={style.label}>Caused of Damage:</span>

              {/* DAMAGE CAUSE */}
              {claim.damageCause
                .filter((x) => x.damagedAreaSize > 0)
                .map((dmg) => (
                  <p key={dmg.damageTypeId.toString()}>
                    {dmg.damageType} - {dmg.damagedAreaSize} sqm.
                  </p>
                ))}

              {/* VALIDATION DATE */}
              {!!claim.validationDate && (
                <>
                  <span className={style.label}>Validation Date:</span>
                  <span>
                    {moment(claim.validationDate).format("MM-DD-YYYY")}
                  </span>
                </>
              )}

              {/* VALIDATION REMARKS */}
              {!!claim.remarks && (
                <>
                  <span className={style.label}>Remarks:</span>
                  <span>{claim.remarks}</span>
                </>
              )}
            </Grid>

            {/* FARMER DETAIL */}
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Hidden mdUp>
                <span className={style.label}>Farm:</span>
                <span>{claim.farm}</span>
              </Hidden>
              {/* FARMER */}
              <span className={style.label}>Farmer:</span>
              <span>{`${claim.firstName} ${claim.lastName}`}</span>

              {/* FARM ADDRESS*/}
              <span className={style.label}>Farm Address:</span>
              <span>{`${claim.address}, ${claim.area}, ${claim.barangay}`}</span>

              {/* FARMER NUMBER */}
              <span className={style.label}>Mobile Number:</span>
              <span>{`+63${claim.mobileNumber}`}</span>
            </Grid>
          </Grid>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default ClaimRowDetail;
