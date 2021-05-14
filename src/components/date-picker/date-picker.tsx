import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { WrapperVariant } from "@material-ui/pickers/wrappers/Wrapper";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import moment from "moment";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      backgroundColor: "rgb(244, 246, 248)",
    },
  })
);

interface DatePickerProps {
  value: ParsableDate;
  onChange: (value: moment.Moment) => void;
  variant?: WrapperVariant;
  inputVariant: "outlined" | "standard" | "filled";
  label: string;
  minDate?: moment.Moment;
  maxDate?: moment.Moment;
}

const AppDatePicker = (props: DatePickerProps) => {
  const style = useStyles();
  return (
    <KeyboardDatePicker
      disableToolbar
      inputVariant={props.inputVariant}
      variant="inline"
      minDate={props.minDate?.toDate()}
      maxDate={props.maxDate?.toDate()}
      format="MM-DD-YYYY"
      fullWidth
      id="date-picker-inline"
      label={props.label}
      value={props.value}
      className={style.formControl}
      onChange={(date: MaterialUiPickersDate | null, value?: string | null) => {
        const val = !!value ? value : "";
        props.onChange(moment(val));
      }}
      KeyboardButtonProps={{
        "aria-label": "change date",
      }}
    />
  );
};

export default AppDatePicker;
