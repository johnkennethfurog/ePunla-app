import { Claim } from "../features/farmer/+models/claim";
import { Farm } from "../features/farmer/+models/farm";
import { FarmCrop } from "../features/farmer/+models/farm-crop";
import { ActionModule } from "./action-module.enum";
import { ActionType } from "./action-type.enum";
import AdminClaim from "../features/admin/+models/claim";
import AdminFarm from "../features/admin/+models/farm";
import { Crop } from "../features/admin/+models/crop";

export interface ActionTodo {
  data: ActionData;
  actionType: ActionType;
  actionModule: ActionModule;
  expand?: boolean;
}

type ActionData = Claim | FarmCrop | Farm | AdminClaim | AdminFarm | Crop;
