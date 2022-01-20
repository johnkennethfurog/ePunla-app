export interface DashboardStatistic {
  statCropPerBarangayDto: StatCropPerBarangayDto[];
  statCropStatusPerBarangayDto: StatCropStatusPerBarangayDto[];
  statFarmerPerBarangayDto: StatFarmerPerBarangayDto[];
  statCountDto: StatCountDto;
  farmerPerBarangayDto: FarmerPerBarangayDto[];
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

export type Crop = {
  crop: string;
  percentage: number;
  count: number;
};

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

export interface FarmerPerBarangayDto {
  barangayId: number;
  barangay: string;
  farmers: Farmer[];
}

export interface Farmer {
  firstName: string;
  lastName: string;
  streetAddress: null;
  mobileNumber: string;
  farmerId: number;
  registrationDate?: Date;
}
