import { FormGroup, FormLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ClaimCausePayload } from "../farmer-models/claim-save-payload";
import { DamageCauseOption } from "../farmer-models/damage-cause-option";
import {
  mapToClaimCausePayload,
  mapToDamageCauseOptions,
} from "../farmer-utils/damabe-cause-mapper";
import ClaimDamageCauseOption from "./claim-damage-cause-option";

type ClaimDamageCauseProps = {
  isOpen: boolean;
  causes: ClaimCausePayload[];
  onChange: (causes: ClaimCausePayload[]) => void;
};

const ClaimDamageCause = (props: ClaimDamageCauseProps) => {
  const { isOpen, causes, onChange } = props;

  const [damageCause, setDamageCause] = useState<DamageCauseOption[]>(() => []);

  useEffect(() => {
    if (!!isOpen) {
      setDamageCause(mapToDamageCauseOptions(causes || []));
    }
  }, [isOpen]);

  const onChangeDamageCause = (
    damageCauseOption: DamageCauseOption,
    index: number
  ) => {
    const newDamageCause = [...damageCause];
    newDamageCause[index] = damageCauseOption;

    setDamageCause([...newDamageCause]);
  };

  useEffect(() => {
    onChange(mapToClaimCausePayload(damageCause));
  }, [damageCause]);

  return (
    <>
      <FormLabel component="legend">Cause of Damage</FormLabel>
      <FormGroup>
        {damageCause.map((cause, index) => {
          return (
            <ClaimDamageCauseOption
              key={cause.damageTypeId.toString()}
              damageCauseOption={cause}
              index={index}
              onChange={onChangeDamageCause}
            />
          );
        })}
      </FormGroup>
    </>
  );
};

export default ClaimDamageCause;
