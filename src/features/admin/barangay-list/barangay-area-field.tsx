import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { values } from "lodash";
import React, { useState } from "react";
import { useEffect } from "react";
import { BarangayAreaSavePayload } from "../+models/barangay-save-payload";
import useInput from "../../../hooks/useInput";

type BarangayAreaFieldProps = {
  index: number;
  area: BarangayAreaSavePayload;
  onChange: (area: BarangayAreaSavePayload, index: number) => void;
  onRemove: (area: BarangayAreaSavePayload, index: number) => void;
};

const BarangayAreaField = (props: BarangayAreaFieldProps) => {
  const { index, area, onChange, onRemove } = props;

  const [areaName, bindAreaName] = useInput(area.area);
  const [isSelected, setIsSelected] = useState(area.areaIsActive);

  useEffect(() => {
    onChange(
      {
        ...area,
        area: areaName,
        areaIsActive: isSelected,
      },
      index
    );
  }, [areaName, isSelected]);

  const handleSelectedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsSelected(isChecked);
  };

  return (
    <FormControl style={{ marginBottom: 15 }} fullWidth variant="outlined">
      <InputLabel>Area Name</InputLabel>
      <OutlinedInput
        label="Area Name"
        fullWidth
        {...bindAreaName}
        startAdornment={
          <InputAdornment position="start">
            <IconButton
              style={{ color: "red" }}
              onClick={() => onRemove(area, index)}
              edge="end"
            >
              <Close />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <FormControlLabel
              key={area.barangayAreaId}
              control={
                <Checkbox
                  checked={isSelected}
                  onChange={handleSelectedChange}
                />
              }
              label="Active"
            />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default BarangayAreaField;
