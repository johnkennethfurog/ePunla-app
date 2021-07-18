import { makeStyles, createStyles } from "@material-ui/core";
import { Theme } from "@testing-library/dom/node_modules/pretty-format";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      marginTop: 3,
    },
    field: {
      minWidth: 110,
      fontWeight: "bold",
    },
    value: {
      marginLeft: 15,
    },
  })
);

type FieldValueDisplayProps = {
  field: string;
  value?: string;
};

const FieldValueDisplay = (props: FieldValueDisplayProps) => {
  const { field, value } = props;
  const style = useStyles();

  return (
    <div className={style.container}>
      <span className={style.field}>{`${field}`}</span>:
      <span className={style.value}>{`${!!value ? value : ""}`}</span>
    </div>
  );
};

export default FieldValueDisplay;
