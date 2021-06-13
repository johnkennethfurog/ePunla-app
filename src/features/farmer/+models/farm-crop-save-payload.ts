export interface FarmCropSavePayload {
  farmCropId?: number;
  farmId: number;
  cropId: number;
  datePlanted: Date;
  areaSize: number;
}
