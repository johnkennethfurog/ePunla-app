import { makeStyles, Theme, createStyles } from "@material-ui/core";
import React from "react";

type StatusProps = {
  pendingStatus: string;
  cancelledStatus: string;
  approvedStatus: string;
  status: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    status: {
      padding: 5,
      borderRadius: 5,
      fontSize: 13,
      fontWeight: "bold",
    },
    pending: {
      backgroundColor: "#ffb74d61",
      color: theme.palette.warning.dark,
    },
    cancelled: {
      backgroundColor: "rgba(255, 72, 66, 0.16)",
      color: theme.palette.error.dark,
    },
    approved: {
      backgroundColor: "rgba(84, 214, 44, 0.16)",
      color: theme.palette.success.dark,
    },
  })
);

const Status = (props: StatusProps) => {
  const style = useStyles();

  const isCancelled = props.status === props.cancelledStatus;
  const isApproved = props.status === props.approvedStatus;
  return (
    <span
      className={[
        style.status,
        isCancelled
          ? style.cancelled
          : isApproved
          ? style.approved
          : style.pending,
      ].join(" ")}
    >
      {props.status}
    </span>
  );
};

export default Status;
