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
import { Claim } from "../models/claim";

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
