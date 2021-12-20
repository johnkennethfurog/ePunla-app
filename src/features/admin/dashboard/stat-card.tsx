import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 175,
    flex: 1,
  },

  title: {
    fontSize: 14,
  },
  value: {
    // marginBottom: 28,
    fontSize: 28,
    color: "#04796a",
    fontWeight: "bold",
  },
});

type StatCardProps = {
  value: string;
  label: string;
};
export const StatCard = ({ value, label }: StatCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.value}>{value}</Typography>

        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};
