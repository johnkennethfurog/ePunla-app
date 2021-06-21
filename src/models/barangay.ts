export interface Barangay {
  barangayId: number;
  barangay: string;
  isActive: boolean;
  areas: BarangayArea[];
}

export interface BarangayArea {
  barangayAreaId: number;
  area: string;
  areaIsActive: boolean;
}
