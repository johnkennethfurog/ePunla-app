import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SimpleDropDown } from "../../../components/select/selects";
import useInput from "../../../hooks/useInput";
import { fetchClaims } from "../farmerActions";
import { StatusClaimList } from "../farmer-models/status-claim.enum";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchForm: {
      padding: 15,
      marginBottom: 20,
    },
  })
);

const ClaimFilter = () => {
  const [status, bindStatus] = useInput("");

  useEffect(() => {
    dispatch(fetchClaims(!!status ? status : null));
  }, [status]);

  const dispatch = useDispatch();
  const style = useStyles();

  return (
    <form className={style.searchForm}>
      <Typography variant="subtitle1" gutterBottom>
        Search Claims
      </Typography>
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
