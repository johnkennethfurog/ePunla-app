import { DamageCause } from "../+models/claim";
import { ClaimCausePayload } from "../+models/claim-save-payload";
import { DamageCauseOption } from "../+models/damage-cause-option";
import { DamageCauseList } from "../+models/damage-cause.enum";

export const mapToDamageCauseOptions = (
  damageCauses: ClaimCausePayload[]
): DamageCauseOption[] => {
  return DamageCauseList.map((dmg) => {
    const dc = damageCauses.find((x) => x.damageTypeId === dmg.id);

    const damageCauseOption: DamageCauseOption = {
      damageType: dmg.value,
      damageTypeId: dmg.id as number,
      isSelected: !!dc,
      damagedAreaSize: dc?.damagedAreaSize || 0,
    };
    return damageCauseOption;
  });
};

export const mapToClaimCausePayload = (
  options: DamageCauseOption[]
): ClaimCausePayload[] => {
  return options
    .filter((opt) => !!opt.isSelected)
    .map((opt) => ({
      damageTypeId: opt.damageTypeId,
      damagedAreaSize: opt.damagedAreaSize,
    }));
};

export const MapToDamageCausePayload = (
  causes: DamageCause[]
): ClaimCausePayload[] =>
  causes.map((cs): ClaimCausePayload => {
    return {
      damageTypeId: cs.damageTypeId,
      damagedAreaSize: cs.damagedAreaSize,
    };
  });
