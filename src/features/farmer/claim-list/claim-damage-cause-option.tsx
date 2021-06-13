import {
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DamageCauseOption } from "../+models/damage-cause-option";

type ClaimDamageCauseOptionProps = {
  index: number;
  damageCauseOption: DamageCauseOption;
  onChange: (damageCauseOption: DamageCauseOption, index: number) => void;
};

const ClaimDamageCauseOption = (props: ClaimDamageCauseOptionProps) => {
  const { damageCauseOption, index, onChange } = props;

  const [isSelected, setIsSelected] = useState(
    () => damageCauseOption.isSelected
  );
  const [areaSize, setAreaSize] = useState(() =>
    damageCauseOption.damagedAreaSize.toString()
  );

  useEffect(() => {
    onChange(
      {
        ...damageCauseOption,
        damagedAreaSize: +areaSize,
        isSelected: isSelected,
      },
      index
    );
  }, [areaSize, isSelected]);

  const handleSelectedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsSelected(isChecked);
  };

  const handleAreaChange = (
    e: React.ChangeEvent<{ name?: string; value: string }>
  ) => {
    setAreaSize(e.target.value);
  };

  return (
    <>
      <FormControlLabel
        key={damageCauseOption.damageTypeId.toString()}
        control={
          <Checkbox checked={isSelected} onChange={handleSelectedChange} />
        }
        label={damageCauseOption.damageType}
      />
      <TextField
        type="number"
        value={areaSize}
        onChange={handleAreaChange}
        variant="outlined"
        InputProps={{
          disabled: !isSelected,
          endAdornment: <InputAdornment position="end">sqm.</InputAdornment>,
        }}
      />
    </>
  );
};

export default ClaimDamageCauseOption;
