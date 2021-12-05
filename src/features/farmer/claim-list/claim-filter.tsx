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
import { fetchClaims } from "../+state/farmerActions";
import {
  StatusClaim,
  StatusClaimList,
} from "../../../models/status-claim.enum";
import { selectreloadData } from "../+state/farmerSelectors";

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

  const reloadData = useSelector(selectreloadData);

  const [status, bindStatus] = useInput(StatusClaim.Pending);

  useEffect(() => {
    dispatch(fetchClaims(!!status ? status : null));
  }, [status]);

  useEffect(() => {
    if (!!reloadData) {
      dispatch(fetchClaims(!!status ? status : null));
    }
  }, [reloadData]);

  return (
    <form className={style.searchForm}>
      <Grid container>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SimpleDropDown
            id="status"
            label="Insurance Claim Status"
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
