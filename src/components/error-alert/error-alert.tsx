import { Alert } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
import { selectError } from "../../features/farmer/+state/farmerSelectors";

const ErrorAlert = () => {
  const errors = useSelector(selectError);

  return (
    <>
      {errors.map((err, ind) => (
        <div
          key={ind.toString()}
          style={{ marginBottom: 5, marginLeft: 5, marginRight: 5 }}
        >
          <Alert severity="error">{err}</Alert>
        </div>
      ))}
    </>
  );
};

export default ErrorAlert;
