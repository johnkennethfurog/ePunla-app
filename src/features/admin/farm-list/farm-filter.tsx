import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SimpleDropDown } from "../../../components/select/selects";
import useInput from "../../../hooks/useInput";
import { fetchFarms } from "../+state/adminActions";
import { StatusFarm, StatusFarmList } from "../../../models/status-farm.enum";
import { selectreloadData } from "../+state/adminSelectors";
import { Page, PagedRequest } from "../../../models/paged-request";
import { FarmSearchField } from "../+models/farm-search-field";
import { useState } from "react";
import {
  fetchBarangays,
  selectBarangay,
} from "../../../app/+states/commonSlice";
import { LookupItem } from "../../../models/lookup-item";
import { useRef } from "react";
import _ from "lodash";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchForm: {
      padding: 15,
      marginBottom: 20,
    },
  })
);

type FarmFilterProps = {
  pageNumber: number;
  pageSize: number;
};

const FarmFilter = (props: FarmFilterProps) => {
  const { pageNumber, pageSize } = props;
  const dispatch = useDispatch();
  const style = useStyles();

  const barangays = useSelector(selectBarangay);

  const reloadData = useSelector(selectreloadData);

  const [barangayLookup, setBarangayLookup] = useState<LookupItem[]>(() => []);
  const [searchText, setSearchText] = useState("");

  const [status, bindStatus] = useInput(StatusFarm.Pending);
  const [barangayId, bindBarangayId] = useInput<string | number>("");

  const [query, bindQuery] = useInput("");

  const delayedQuery = useRef(
    _.debounce((query: string) => {
      setSearchText(query);
    }, 500)
  ).current;

  useEffect(() => {
    dispatch(fetchBarangays());
  }, []);

  useEffect(() => {
    delayedQuery(query);
  }, [query]);

  useEffect(() => {
    const lookup = barangays
      .filter((x) => x.isActive)
      .map((x) => {
        return {
          value: x.barangay,
          id: x.barangayId,
        } as LookupItem;
      });

    lookup.unshift({
      value: "All",
      id: "",
    });
    setBarangayLookup(lookup);
  }, [barangays]);

  useEffect(() => {
    loadFarms();
  }, [status, searchText, barangayId, pageSize, pageNumber]);

  useEffect(() => {
    if (!!reloadData) {
      loadFarms();
    }
  }, [reloadData]);

  const loadFarms = () => {
    const page: Page = {
      pageNumber: pageNumber + 1,
      pageSize,
    };

    const searchField: FarmSearchField = {
      status: !!status ? status : null,
      barangayId: !!barangayId ? +barangayId : null,
      searchText: searchText,
    };

    const payload: PagedRequest<FarmSearchField> = {
      page,
      searchField,
    };

    dispatch(fetchFarms(payload));
  };

  return (
    <form className={style.searchForm}>
      <Typography gutterBottom>Search Farms</Typography>
      <Grid spacing={2} container>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Farmer name, Farm name or Address"
            fullWidth
            {...bindQuery}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <SimpleDropDown
            id="status"
            label="Farm Status"
            fullWidth
            bind={bindStatus}
            options={StatusFarmList}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <SimpleDropDown
            label="Barangay"
            fullWidth
            bind={bindBarangayId}
            options={barangayLookup}
            hideEmptyOption={true}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default FarmFilter;
