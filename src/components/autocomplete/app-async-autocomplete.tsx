import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../app/+states/commonSlice";
import { RootState } from "../../app/store";
import { LookupItem } from "../../models/lookup-item";
import useStyles from "./autocomplete.style";
import _ from "lodash";

type AsyncAutoCompleteProps = {
  label: string;
  id?: string;
  value: string | number;
  onChange: (lookupItem: LookupItem) => void;
  loadLookups: (keyword: string) => void;
  clearLookups: () => void;
  lookupSelector: (state: RootState) => LookupItem[];
  initialValue?: LookupItem;
  required?: boolean;
};

const AppAsyncAutoComplete = (props: AsyncAutoCompleteProps) => {
  const styles = useStyles();
  const [inputValue, setInputValue] = useState(
    () => props.initialValue?.value || ""
  );
  const [itemSelected, setItemSelected] = useState(() => false);

  const isLoading = useSelector(selectIsLoading);
  const lookups = useSelector(props.lookupSelector);
  const delayedQuery = useRef(
    _.debounce((q: string) => {
      if (!!q) {
        props.loadLookups(q);
      } else {
        props.clearLookups();
      }
    }, 500)
  ).current;

  useEffect(() => {
    if (!itemSelected) {
      delayedQuery(inputValue);
    } else {
      setItemSelected(false);
    }
  }, [inputValue]);

  useEffect(() => {
    if (isLoading) {
      props.clearLookups();
    }
  }, [isLoading]);

  const onChangeLookup = (
    e: React.ChangeEvent<{}>,
    lookupValue: string | LookupItem,
    reason: string
  ) => {
    setItemSelected(true);
    const lookupItem = lookupValue as LookupItem;
    props.onChange(lookupItem);
  };

  return (
    <Autocomplete
      id={props.id || props.label}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      fullWidth
      defaultValue={props.initialValue}
      className={styles.formControl}
      loading={isLoading}
      loadingText="Loading ..."
      options={lookups}
      getOptionLabel={(option) => option?.value || ""}
      onChange={onChangeLookup}
      renderInput={(params) => (
        <TextField
          required={props.required}
          {...params}
          label={props.label}
          variant="outlined"
        />
      )}
    />
  );
};

export default AppAsyncAutoComplete;
