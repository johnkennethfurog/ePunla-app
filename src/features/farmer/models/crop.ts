export interface Crop {
  farmCropId: number;
  crop: string;
  cropId: number;
  categoryId: number;
  category: string;
  farmId: number;
  farm: string;
  estimatedHarvestDate: Date;
  plantedDate: Date;
  areaSize: number;
  status: string;
  harvestDate: Date;
}
