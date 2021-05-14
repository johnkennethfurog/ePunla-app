import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { LookupItem } from "../../models/lookup-item";
import useStyles from "./autocomplete.style";

type AutoCompleteProps = {
  options: LookupItem[];
  label: string;
  id?: string;
  value: string | number;
  onChange: (lookupItem: LookupItem) => void;
};

const AppAutoComplete = (props: AutoCompleteProps) => {
  const styles = useStyles();

  const onChangeLookup = (
    e: React.ChangeEvent<{}>,
    lookupValue: string | LookupItem,
    reason: string
  ) => {
    const lookupItem = lookupValue as LookupItem;
    props.onChange(lookupItem);
  };

  return (
    <Autocomplete
      className={styles.formControl}
      id={props.id || props.label}
      options={props.options}
      getOptionLabel={(option) => option.value}
      onChange={onChangeLookup}
      renderInput={(params) => (
        <TextField {...params} label={props.label} variant="outlined" />
      )}
    />
  );
};

export default AppAutoComplete;
