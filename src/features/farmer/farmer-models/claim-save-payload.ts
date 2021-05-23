export interface ClaimSavePayload {
  claimId: number;
  farmCropId: number;
  damagedArea: string;
  description: string;
  photoUrl: string;
  photoId: string;
  claimCauses: ClaimCausePayload[];
}

export interface ClaimCausePayload {
  damageTypeId: number;
  damagedAreaSize: number;
}
