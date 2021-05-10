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
    formControl: {},
  })
);

type DropDownProps = {
  id?: string;
  label: string;
  bind: { value: string | number; onChange: (e: any) => void };
  options: LookupItem[];
  fullWidth?: boolean;
  emptyValue?: string | number;
};

export const SimpleDropDown = (props: DropDownProps) => {
  const style = useStyles();

  return (
    <FormControl
      className={style.formControl}
      variant="filled"
      id={props.id}
      fullWidth={props.fullWidth}
    >
      <InputLabel id={props.id}>{props.label}</InputLabel>
      <Select {...props.bind} labelId={props.id} id={props.id + "_"}>
        <MenuItem value={props.emptyValue ? props.emptyValue : ""}>
          <em>None</em>
        </MenuItem>
        {props.options.map((opt) => {
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
