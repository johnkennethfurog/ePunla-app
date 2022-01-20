import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SimpleDropDown } from "../../../components/select/selects";
import useInput from "../../../hooks/useInput";
import { LookupItem } from "../../../models/lookup-item";
import { fetchCategories, fetchCrops } from "../+state/adminActions";
import { selectCategories, selectreloadData } from "../+state/adminSelectors";
import { CropSearchField } from "../+models/crop-search-field";
import { Page } from "../../../models/paged-request";
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

type CropsFilterProps = {
  pageNumber: number;
  pageSize: number;
};

const CropsFilter = (props: CropsFilterProps) => {
  const { pageNumber, pageSize } = props;
  const dispatch = useDispatch();
  const style = useStyles();

  const [categoryLookup, setCategoryLookup] = useState<LookupItem[]>(() => []);
  const [searchText, setSearchText] = useState("");

  const [query, bindQuery] = useInput("");
  const [category, bindCategory] = useInput("");

  const reloadData = useSelector(selectreloadData);
  const categories = useSelector(selectCategories);

  const delayedQuery = useRef(
    _.debounce((query: string) => {
      setSearchText(query);
    }, 500)
  ).current;

  useEffect(() => {
    dispatch(fetchCategories());
    return () => {};
  }, []);

  useEffect(() => {
    delayedQuery(query);
  }, [query]);

  useEffect(() => {
    if (!!reloadData) {
      loadCrops();
    }
  }, [reloadData]);

  useEffect(() => {
    const lookup = categories.map((x) => {
      return {
        value: x.category,
        id: x.categoryId,
      } as LookupItem;
    });

    setCategoryLookup(lookup);
  }, [categories]);

  useEffect(() => {
    loadCrops();
  }, [category, searchText, pageSize, pageNumber]);

  const loadCrops = () => {
    const page: Page = {
      pageNumber: pageNumber + 1,
      pageSize,
    };

    const searchField: CropSearchField = {
      searchText: searchText,
      categoryId: !!category ? +category : null,
      showInactive: false,
    };

    dispatch(
      fetchCrops({
        page,
        searchField,
      })
    );
  };

  return (
    <form className={style.searchForm}>
      <Typography variant="subtitle1" gutterBottom>
        Crops Occurancy
      </Typography>

      <Grid spacing={2} container>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <TextField
            label="Crop Name"
            fullWidth
            {...bindQuery}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <SimpleDropDown
            label="Category"
            fullWidth
            bind={bindCategory}
            options={categoryLookup}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default CropsFilter;
