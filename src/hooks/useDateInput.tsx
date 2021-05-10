import moment from "moment";
import { useState } from "react";

const useDateInput = (initialValue: moment.Moment | null) => {
  const [value, setValue] = useState(() => initialValue);

  const set = (moment: moment.Moment) => {
    setValue(moment);
  };

  const bind = {
    value,
    onChange: (date: moment.Moment) => {
      setValue(date);
    },
  };

  return [value, bind, set] as const;
};

export default useDateInput;
