import React from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";

import drawerItems from "./+utils/drawer-items";
import FarmList from "./farm-list/farm-list";
import ClaimList from "./claim-list/claim-list";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/+states/userSlice";
// import {
//   selectIsPending,
//   selectFarmerAvatar,
//   selectFarmerFullname,
// } from "./+state/farmerSelectors";
import { Alert } from "@material-ui/lab";
import { useEffect } from "react";
// import { farmerLogout, fetchProfile } from "./+state/farmerActions";
import Shell from "../../components/shell/shell";

const AdminPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();

  // const avatar = useSelector(selectFarmerAvatar);
  // const fullName = useSelector(selectFarmerFullname);

  useEffect(() => {
    // dispatch(fetchProfile());
  }, []);

  const handleLogout = () => {
    // history.push("signin");
    // dispatch(logout());
    // dispatch(farmerLogout());
  };

  console.log(`${path}farms`);

  return (
    <Shell
      drawerItems={drawerItems}
      fullName={"XXX"}
      avatar={""}
      onLogout={handleLogout}
    >
      <>
        <Switch>
          <Route path={`${path}/farms`}>
            <FarmList />
          </Route>
          <Route path={`${path}/claims`}>
            <ClaimList />
          </Route>
        </Switch>
      </>
    </Shell>
  );
};

export default AdminPage;