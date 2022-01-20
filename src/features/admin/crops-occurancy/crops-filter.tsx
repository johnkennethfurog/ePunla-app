import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Grid,
} from "@material-ui/core";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCropsOccurance } from "../+state/adminActions";
import { selectreloadData } from "../+state/adminSelectors";
import _ from "lodash";
import AppDatePicker from "../../../components/date-picker/date-picker";
import moment from "moment";
import useDateInput from "../../../hooks/useDateInput";
import { CropOccuranceSearchField } from "../+models/crop-occurance-search-field";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchForm: {
      padding: 15,
      marginBottom: 20,
    },
  })
);

const CropsFilter = () => {
  const dispatch = useDispatch();
  const style = useStyles();

  const [plantedFrom, bindPlantedFrom] = useDateInput(moment().startOf("year"));
  const [plantedTo, bindPlantedTo] = useDateInput(moment());

  const reloadData = useSelector(selectreloadData);

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    if (!!reloadData) {
      loadCrops();
    }
  }, [reloadData]);

  useEffect(() => {
    loadCrops();
  }, [plantedFrom, plantedTo]);

  const loadCrops = () => {
    const searchField: CropOccuranceSearchField = {
      plantedFrom: plantedFrom.toDate(),
      plantedTo: plantedTo.toDate(),
    };

    dispatch(fetchCropsOccurance(searchField));
  };

  return (
    <form className={style.searchForm}>
      <Typography variant="subtitle1" gutterBottom>
        Search Crops Occurance
      </Typography>

      <Grid style={{ marginTop: 10 }} spacing={2} container>
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
