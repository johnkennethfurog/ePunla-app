import { Button } from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";
import React from "react";

type ButtonPrint = {
  onClick: () => void;
  style?: React.CSSProperties;
};

export const ButtonPrint = ({ onClick, style }: ButtonPrint) => {
  return (
    <Button
      style={style ?? {}}
      color="primary"
      onClick={onClick}
      startIcon={<PrintIcon />}
    >
      Print
    </Button>
  );
};
