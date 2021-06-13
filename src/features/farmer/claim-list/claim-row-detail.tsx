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
import { Claim } from "../+models/claim";
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
          <Grid container className={style.rootGrid} spacing={5}>
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
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Hidden mdUp>
                {/* DATE FILED */}
                <span className={style.label}>Date Filed:</span>
                <span>{moment(claim.filingDate).format("MM-DD-YYYY")}</span>

                {/* FARM */}
                <span className={style.label}>Farm:</span>
                <span>{claim.farm}</span>

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
            </Grid>
          </Grid>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default ClaimRowDetail;
