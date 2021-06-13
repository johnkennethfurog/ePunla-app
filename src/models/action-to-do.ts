import { Claim } from "../features/farmer/+models/claim";
import { Farm } from "../features/farmer/+models/farm";
import { FarmCrop } from "../features/farmer/+models/farm-crop";
import { ActionModule } from "./action-module.enum";
import { ActionType } from "./action-type.enum";

export interface ActionTodo {
  data: ActionData;
  actionType: ActionType;
  actionModule: ActionModule;
  expand?: boolean;
}

type ActionData = Claim | FarmCrop | Farm;
