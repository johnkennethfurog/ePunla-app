import { LookupItem } from "./lookup-item";
import { LookupType } from "./lookup-type.enum";

export interface LookupItemResponse {
  lookupType: LookupType;
  lookupItems: LookupItem[];
}
