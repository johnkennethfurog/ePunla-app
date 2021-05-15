import {
  createStyles,
  FormControl,
  InputLabel,
  InputLabelProps,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import React from "react";
import { LookupItem } from "../../models/lookup-item";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      backgroundColor: "rgb(244, 246, 248)",
    },
  })
);

type DropDownProps = {
  id?: string;
  label: string;
  bind: { value: string | number; onChange: (e: any) => void };
  options: LookupItem[];
  fullWidth?: boolean;
  emptyValue?: string | number;
  hideEmptyOption?: boolean;
};

export const SimpleDropDown = (props: DropDownProps) => {
  const style = useStyles();
  const { hideEmptyOption, label, fullWidth, id, bind, options, emptyValue } =
    props;

  return (
    <FormControl
      className={style.formControl}
      variant="outlined"
      id={id}
      fullWidth={fullWidth}
    >
      <InputLabel id={id}>{label}</InputLabel>
      <Select label={label} {...bind} labelId={id} id={id + "_"}>
        {!hideEmptyOption && (
          <MenuItem value={emptyValue ? emptyValue : ""}>
            <em>None</em>
          </MenuItem>
        )}

        {options.map((opt) => {
          return (
            <MenuItem key={opt.id} value={opt.id}>
              {opt.value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
