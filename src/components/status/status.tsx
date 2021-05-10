import { makeStyles, Theme, createStyles, Chip } from "@material-ui/core";
import React from "react";

type StatusProps = {
  pendingStatus: string;
  cancelledStatus: string;
  approvedStatus: string;
  status: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pending: {
      backgroundColor: theme.palette.warning.dark,
      color: "white",
    },
    cancelled: {
      backgroundColor: theme.palette.error.dark,
      color: "white",
    },
    approved: {
      backgroundColor: theme.palette.success.dark,
      color: "white",
    },
  })
);

const Status = (props: StatusProps) => {
  const style = useStyles();

  const isCancelled = props.status === props.cancelledStatus;
  const isApproved = props.status === props.approvedStatus;
  return (
    <Chip
      className={
        isCancelled
          ? style.cancelled
          : isApproved
          ? style.approved
          : style.pending
      }
      label={props.status}
    />
  );
};

export default Status;
