import Grid from "@material-ui/core/Grid/Grid";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Stat } from "../+models/farmer-dashboard";
import { StatCard } from "./stat-card";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootGrid: {
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      color: "#04796a",
      fontWeight: "bold",
      marginBottom: 5,
    },
  })
);

type RowStatCardProps = {
  stat: Stat[];
  bgColor: "green" | "red" | "orange";
  logo: string;
  title: string;
};

export const RowStatCard = ({
  stat,
  logo,
  bgColor,
  title,
}: RowStatCardProps) => {
  const style = useStyles();
  return (
    <>
      <Typography className={style.title}>{title}</Typography>
      <Grid container spacing={2} className={style.rootGrid}>
        {stat.map((crop, ind) => (
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <StatCard
              bgColor={bgColor}
              logo={logo}
              value={`${crop.areaSize.toLocaleString()} sqm.`}
              label={`#${ind + 1} ${crop.name} - Total Area Size`}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
