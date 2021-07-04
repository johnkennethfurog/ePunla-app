import { Alert } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { selectError } from "../../features/farmer/+state/farmerSelectors";

type ErrorAlertProps = {
  errorSelector: (state: RootState) => string[];
};
const ErrorAlert = (props: ErrorAlertProps) => {
  const { errorSelector } = props;
  const errors = useSelector(errorSelector);

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
