import { PagedResponse } from "../../../models/paged-response";

export interface PagedCrop {
  page: PagedResponse;
  values: Crop[];
}

export interface Crop {
  cropId?: number;
  crop: string;
  duration: number;
  categoryId: number;
  category: string;
  isActive: boolean;
}
