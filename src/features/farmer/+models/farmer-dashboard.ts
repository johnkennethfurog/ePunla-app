export interface FarmerDashboard {
  planted: Stat[];
  damaged: Stat[];
  harvested: Stat[];
}

export interface Stat {
  cropId: number;
  name: string;
  areaSize: number;
  count: number;
  status: string;
}
