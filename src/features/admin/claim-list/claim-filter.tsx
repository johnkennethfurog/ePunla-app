import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Typography,
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
import { selectReloadTable } from "../+state/adminSelectors";
import { Page, PagedRequest } from "../../../models/paged-request";
import { ClaimSearchField } from "../+models/claim-search-field";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchForm: {
      padding: 15,
      marginBottom: 20,
    },
  })
);

const ClaimFilter = () => {
  const dispatch = useDispatch();
  const style = useStyles();

  const reloadTable = useSelector(selectReloadTable);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [status, bindStatus] = useInput(StatusClaim.Pending);

  useEffect(() => {
    loadClaims();
  }, [status]);

  useEffect(() => {
    if (!!reloadTable) {
      loadClaims();
    }
  }, [reloadTable]);

  const loadClaims = () => {
    const page: Page = {
      pageNumber,
      pageSize,
    };

    const searchField: ClaimSearchField = {
      status: !!status ? status : null,
      barangayId: null,
      searchText: null,
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
      <Grid container>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SimpleDropDown
            id="status"
            label="Claim Status"
            fullWidth
            bind={bindStatus}
            options={StatusClaimList}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ClaimFilter;
