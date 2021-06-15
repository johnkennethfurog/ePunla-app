import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { doAction } from "../../app/+states/commonSlice";
import { FarmCrop } from "../../features/farmer/+models/farm-crop";
import { selectCropsToHarvest } from "../../features/farmer/+state/farmerSelectors";
import { ActionModule } from "../../models/action-module.enum";
import { ActionType } from "../../models/action-type.enum";

const BannerCropToHarvest = () => {
  const dispatch = useDispatch();

  const cropsToHarvest = useSelector(selectCropsToHarvest);

  const onHarvest = (data: FarmCrop) => {
    dispatch(
      doAction({
        data,
        actionType: ActionType.HarvestCrops,
        actionModule: ActionModule.FarmerCropsModule,
        expand: false,
      })
    );
  };

  return (
    <>
      {cropsToHarvest.map((crop) => (
        <Alert
          key={crop.farmCropId.toString()}
          style={{ marginBottom: 10 }}
          severity="info"
          action={
            <Button
              onClick={() => onHarvest(crop)}
              color="inherit"
              size="small"
            >
              HARVEST
            </Button>
          }
        >
          {`Your crop: ${crop.crop} from your farm: ${crop.farm} is now due for harvest`}
        </Alert>
      ))}
    </>
  );
};

export default BannerCropToHarvest;
