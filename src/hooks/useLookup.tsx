import { useState } from "react";
import { LookupItem } from "../models/lookup-item";
import { setDefault } from "../utils/helper";

const useLookup = (initialValue: number | string) => {
  const [value, setValue] = useState(() => {
    return initialValue;
  });

  const set = (newValue: number | string) => {
    if (!newValue) {
      setValue(setDefault(initialValue));
      return;
    }
    setValue(newValue);
  };

  const bind = {
    value,
    onChange: (lookupItem: LookupItem) => {
      setValue(lookupItem?.id);
    },
  };

  return [value, bind, set] as const;
};

export default useLookup;
