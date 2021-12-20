export interface DashboardStatistic {
  statCropPerBarangayDto: StatCropPerBarangayDto[];
  statCropStatusPerBarangayDto: StatCropStatusPerBarangayDto[];
  statFarmerPerBarangayDto: StatFarmerPerBarangayDto[];
  statCountDto: StatCountDto;
}

export interface StatCountDto {
  farmCount: number;
  activeFarmerCount: number;
  plantedCropsSqm: number;
  harvestedCropsSqm: number;
  damagedCropsSqm: number;
}

export interface StatCropPerBarangayDto {
  barangayId: number;
  barangay: string;
  lat: number;
  lng: number;
  crops: Crop[];
  totalCount: number;
}

export interface Crop {
  crop: string;
  percentage: number;
  count: number;
}

export interface StatCropStatusPerBarangayDto {
  barangayId: number;
  barangay: string;
  planted: number;
  damaged: number;
  harvested: number;
}

export interface StatFarmerPerBarangayDto {
  barangayId: number;
  barangay: string;
  farmerCount: number;
}
