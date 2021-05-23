import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Grid,
} from "@material-ui/core";

import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCropLookup,
  fetchCropsLookups,
  selectCropsLookup,
} from "../../../app/commonSlice";
import AppAsyncAutoComplete from "../../../components/autocomplete/app-async-autocomplete";
import AppDatePicker from "../../../components/date-picker/date-picker";
import { SimpleDropDown } from "../../../components/select/selects";
import useDateInput from "../../../hooks/useDateInput";
import useInput from "../../../hooks/useInput";
import useLookup from "../../../hooks/useLookup";
import { LookupItem } from "../../../models/lookup-item";
import { fetchCrops } from "../farmerActions";
import { StatusCropList } from "../farmer-models/status-crop.enum";
import { selectReloadTable } from "../farmerSelectors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchForm: {
      padding: 15,
      marginBottom: 20,
    },
  })
);

const crops: LookupItem[] = [
  {
    id: 1,
    value: "Talong",
  },
  {
    id: 2,
    value: "Ubas",
  },
  {
    id: 3,
    value: "Kalabasa",
  },
];

const CropsFilter = () => {
  const dispatch = useDispatch();
  const style = useStyles();

  const [status, bindStatus] = useInput("");

  const [crop, bindCrop] = useLookup(null);

  const reloadTable = useSelector(selectReloadTable);

  const [plantedFrom, bindPlantedFrom] = useDateInput(moment().startOf("year"));
  const [plantedTo, bindPlantedTo] = useDateInput(moment());

  useEffect(() => {
    return () => {
      console.log("unmounting");
    };
  }, []);

  useEffect(() => {
    if (!!reloadTable) {
      loadCrops();
    }
  }, [reloadTable]);

  useEffect(() => {
    loadCrops();
  }, [status, crop, plantedFrom, plantedTo]);

  const loadCrops = () => {
    dispatch(
      fetchCrops({
        status: !!status ? status : null,
        plantedFrom: plantedFrom.toDate(),
        plantedTo: plantedTo.toDate(),
        cropId: crop as number,
      })
    );
  };

  return (
    <form className={style.searchForm}>
      <Typography variant="subtitle1" gutterBottom>
        Search Crops
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <AppAsyncAutoComplete
            loadLookups={(keyword: string) => {
              dispatch(fetchCropsLookups(keyword));
            }}
            clearLookups={() => {
              dispatch(clearCropLookup());
            }}
            lookupSelector={selectCropsLookup}
            label="Select Crop"
            id="selectCrop"
            {...bindCrop}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={3}>
          <SimpleDropDown
            id="status"
            label="Crop Status"
            fullWidth
            bind={bindStatus}
            options={StatusCropList}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={3}>
          <AppDatePicker
            label="Planted From"
            inputVariant={"outlined"}
            maxDate={plantedTo}
            {...bindPlantedFrom}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={3}>
          <AppDatePicker
            label="Planted To"
            inputVariant={"outlined"}
            {...bindPlantedTo}
            minDate={plantedFrom}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default CropsFilter;
