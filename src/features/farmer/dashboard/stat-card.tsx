import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    display: "flex",
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
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  icon: {
    height: 50,
  },
});
// #c7ffc7
type StatCardProps = {
  value: string;
  label: string;
  bgColor: "green" | "red" | "orange";
  logo: string;
};
export const StatCard = ({ value, label, bgColor, logo }: StatCardProps) => {
  const classes = useStyles();

  const iconBgColor = React.useMemo(() => {
    switch (bgColor) {
      case "green":
        return "rgba(84, 214, 44, 0.16)";
      case "orange":
        return "#ffb74d61";
      case "red":
        return "rgba(255, 72, 66, 0.16";
    }
  }, [bgColor]);

  const fontColor = React.useMemo(() => {
    switch (bgColor) {
      case "green":
        return "#04796a";
      case "orange":
        return "#f57c01";
      case "red":
        return "#d3302f";
    }
  }, [bgColor]);

  return (
    <Card className={classes.root}>
      <div
        style={{ backgroundColor: iconBgColor }}
        className={classes.iconContainer}
      >
        <img className={classes.icon} src={logo} />
      </div>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {label}
        </Typography>
        <Typography style={{ color: fontColor }} className={classes.value}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};
