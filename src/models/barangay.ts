export interface Barangay {
  barangayId: number;
  barangay: string;
  areas: BarangayArea[];
}

export interface BarangayArea {
  barangayAreaId: number;
  area: string;
}
