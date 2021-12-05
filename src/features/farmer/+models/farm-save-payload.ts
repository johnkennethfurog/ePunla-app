import { Coordinates } from "../../../models/coordinates";

export interface FarmSavePayload {
  farmId?: number;
  name: string;
  size: number;
  streetAddress: string;
  barangayId: number;
  barangayAreaId: number;
  lng: number;
  lat: number;
  imageUrl: string;
  imageUrlId: string;
}
