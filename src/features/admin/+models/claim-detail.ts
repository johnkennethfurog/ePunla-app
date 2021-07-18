import { ClaimDamageCause } from "./claim-damage-cause";

export interface ClaimDetail {
  claimId: number;
  filingDate: Date;
  damagedArea: string;
  status: string;
  description: string;
  photoUrl: null;
  remarks: string;
  validationDate: Date;
  damageCause: ClaimDamageCause[];
  totalDamagedArea: number;
  crop: string;
  datePlanted: Date;
  cropAreaSize: number;
  farm: string;
  address: string;
  barangay: string;
  area: string;
  farmSize: number;
  firstName: string;
  lastName: string;
  middleName: null;
  avatar: null;
  mobileNumber: string;
  farmerBarangay: string;
  farmerArea: string;
  farmerAddress: string;
}
