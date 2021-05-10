import { useState } from "react";
import { setDefault } from "../utils/helper";
const useInput = <T,>(initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    return initialValue || setDefault(initialValue);
  });

  const set = (newValue: T) => {
    if (!newValue) {
      setValue(setDefault(initialValue));
      return;
    }
    setValue(newValue);
  };

  const bind = {
    value,
    onChange: (e: any) => {
      setValue(e.target.value);
    },
  };

  return [value, bind, set] as const;
};

export default useInput;
