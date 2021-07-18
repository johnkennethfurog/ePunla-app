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
import { fetchClaims } from "../+state/adminActions";
import {
  StatusClaim,
  StatusClaimList,
} from "../../../models/status-claim.enum";
import { selectreloadData } from "../+state/adminSelectors";
import { Page, PagedRequest } from "../../../models/paged-request";
import { ClaimSearchField } from "../+models/claim-search-field";
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

type ClaimFilterProps = {
  pageNumber: number;
  pageSize: number;
};

const ClaimFilter = (props: ClaimFilterProps) => {
  const { pageNumber, pageSize } = props;
  const dispatch = useDispatch();
  const style = useStyles();

  const barangays = useSelector(selectBarangay);

  const reloadData = useSelector(selectreloadData);

  const [barangayLookup, setBarangayLookup] = useState<LookupItem[]>(() => []);
  const [searchText, setSearchText] = useState("");

  const [status, bindStatus] = useInput(StatusClaim.Pending);
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
    const lookup = barangays.map((x) => {
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
    loadClaims();
  }, [status, searchText, barangayId, pageSize, pageNumber]);

  useEffect(() => {
    if (!!reloadData) {
      loadClaims();
    }
  }, [reloadData]);

  const loadClaims = () => {
    const page: Page = {
      pageNumber: pageNumber + 1,
      pageSize,
    };

    const searchField: ClaimSearchField = {
      status: !!status ? status : null,
      barangayId: !!barangayId ? +barangayId : null,
      searchText: searchText,
    };

    const payload: PagedRequest<ClaimSearchField> = {
      page,
      searchField,
    };

    dispatch(fetchClaims(payload));
  };

  return (
    <form className={style.searchForm}>
      <Typography gutterBottom>Search Claims</Typography>
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
            label="Claim Status"
            fullWidth
            bind={bindStatus}
            options={StatusClaimList}
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

export default ClaimFilter;
