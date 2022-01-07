import { PagedResponse } from "../../../models/paged-response";
import { ClaimDamageCause } from "./claim-damage-cause";

export interface PagedClaim {
  page: PagedResponse;
  values: Claim[];
}
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
  damageCause: ClaimDamageCause[];
  referenceNumber: string;
}
