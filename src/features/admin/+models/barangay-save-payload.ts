export interface BarangaySavePayload {
  barangayId?: number;
  barangayName: string;
  areas: BarangayAreaSavePayload[];
}

export interface BarangayAreaSavePayload {
  barangayAreaId?: number | string;
  area: string;
  areaIsActive: boolean;
}
