import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon";

export interface DrawerItem {
  iconComponent: JSX.Element;
  title: string;
  route: string;
}
