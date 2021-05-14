import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Grid,
} from "@material-ui/core";

import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  clearCropLookup,
  fetchCropsLookups,
  selectCropsLookup,
} from "../../../app/commonSlice";
import AppAsyncAutoComplete from "../../../components/autocomplete/app-async-autocomplete";
import AppAutoComplete from "../../../components/autocomplete/app-autocomplete";
import AppDatePicker from "../../../components/date-picker/date-picker";
import { SimpleDropDown } from "../../../components/select/selects";
import useDateInput from "../../../hooks/useDateInput";
import useInput from "../../../hooks/useInput";
import useLookup from "../../../hooks/useLookup";
import { LookupItem } from "../../../models/lookup-item";
import { fetchCrops } from "../farmerSlice";
import { StatusCropList } from "../models/status-crop.enum";

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
  const [status, bindStatus] = useInput("");
  const [crop, bindCrop] = useLookup(null);
  const [plantedFrom, bindPlantedFrom] = useDateInput(moment().startOf("year"));
  const [plantedTo, bindPlantedTo] = useDateInput(moment());
  const dispatch = useDispatch();
  const style = useStyles();

  useEffect(() => {
    return () => {
      console.log("unmounting");
    };
  }, []);

  useEffect(() => {
    dispatch(
      fetchCrops({
        status: !!status ? status : null,
        plantedFrom: plantedFrom.toDate(),
        plantedTo: plantedTo.toDate(),
        cropId: crop as number,
      })
    );
  }, [status, crop, plantedFrom, plantedTo]);

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
