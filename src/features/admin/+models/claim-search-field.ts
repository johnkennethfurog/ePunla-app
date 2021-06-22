import { Page } from "../../../models/paged-request";

export interface ClaimSearchField {
  status: string;
  searchText: string;
  barangayId?: number;
}
