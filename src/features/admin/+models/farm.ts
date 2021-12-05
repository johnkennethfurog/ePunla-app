import { PagedResponse } from "../../../models/paged-response";

export interface PagedFarm {
  page: PagedResponse;
  values: Farm[];
}
export default interface Farm {
  farmId: number;
  farm: string;
  barangay: string;
  area: string;
  address: string;
  status: string;
  areaSize: number;
  farmerId: number;
  farmer: string;
  mobileNumber: string;
  avatar: null;
  farmerStatus: string;
  farmerBarangay: string;
  farmerArea: string;
  farmerAddress: string;
  identityDocumentUrl: string;
  identityDocumentId: string;
  imageUrl: string;
  imageUrlId: string;
}
