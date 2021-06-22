export default interface Claim {
  claimId: number;
  filingDate: Date;
  crop: string;
  damagedArea: string;
  status: string;
  description: string;
  photoUrl: string;
  remarks: null;
  validationDate: Date;
  farm: string;
  address: string;
  barangay: string;
  area: string;
  firstName: string;
  lastName: string;
  middleName: null;
  avatar: null;
  mobileNumber: string;
  damageCause: DamageCause[];
}

export interface DamageCause {
  damageType: string;
  damagedAreaSize: number;
  damageTypeId: number;
}
