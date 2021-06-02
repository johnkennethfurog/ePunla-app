import {
  Button,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectIsSaving,
} from "../../features/farmer/farmerSelectors";

import { selectUserLoading } from "../../app/+states/userSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      // margin: theme.spacing(1),
      position: "relative",
    },
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

type ButtonLoadingProps = {
  onClick: () => void;
  autoFocus?: boolean;
  text: string;
};

const ButtonLoading = (props: ButtonLoadingProps) => {
  const { onClick, text, autoFocus } = props;
  const loading = useSelector(selectIsLoading);
  const isUserLoading = useSelector(selectUserLoading);
  const isSaving = useSelector(selectIsSaving);
  const style = useStyles();

  return (
    <div className={style.wrapper}>
      <Button
        autoFocus
        variant="contained"
        color="primary"
        disabled={loading || isSaving}
        onClick={onClick}
      >
        {text}
      </Button>
      {(loading || isSaving || isUserLoading) && (
        <CircularProgress size={24} className={style.buttonProgress} />
      )}
    </div>
  );
};

export default ButtonLoading;
