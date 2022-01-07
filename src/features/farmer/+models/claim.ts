export interface Claim {
  claimId: number;
  filingDate: Date;
  crop: string;
  farm: string;
  damagedArea: string;
  status: string;
  description: string;
  photoUrl: string;
  farmCropId: number;
  farmId: number;
  photoId: string;
  validationDate?: Date;
  damageCause: DamageCause[];
  referenceNumber: string;
}

export interface DamageCause {
  damageType: string;
  damagedAreaSize: number;
  damageTypeId: number;
}
