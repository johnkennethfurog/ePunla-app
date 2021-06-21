import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import drawerItems from "./+utils/drawer-items";
import FarmList from "./farm-list/farm-list";
import ClaimList from "./claim-list/claim-list";
import CropList from "./crops-list/crops-list";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/+states/userSlice";
import {
  selectIsPending,
  selectFarmerAvatar,
  selectFarmerFullname,
} from "./+state/farmerSelectors";
import { Alert } from "@material-ui/lab";
import { useEffect } from "react";
import { farmerLogout, fetchProfile } from "./+state/farmerActions";
import Shell from "../../components/shell/shell";

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const avatar = useSelector(selectFarmerAvatar);
  const fullName = useSelector(selectFarmerFullname);
  const isPending = useSelector(selectIsPending);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  const handleLogout = () => {
    history.push("signin");
    dispatch(logout());
    dispatch(farmerLogout());
  };

  return (
    <Shell
      drawerItems={drawerItems}
      fullName={fullName}
      avatar={avatar}
      onLogout={handleLogout}
    >
      <>
        {!!isPending && (
          <Alert style={{ marginBottom: 10 }} severity="warning">
            Your registration status is still <b>Pending</b> and still waiting
            for our <b>administrator's Approval</b>
          </Alert>
        )}

        <Switch>
          <Route exact path="/farms">
            <FarmList />
          </Route>
          <Route exact path="/claims">
            <ClaimList />
          </Route>
          <Route exact path="/crops">
            <CropList />
          </Route>
        </Switch>
      </>
    </Shell>
  );
};

export default HomePage;
