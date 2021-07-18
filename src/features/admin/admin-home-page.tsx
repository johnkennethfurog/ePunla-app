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
import CropList from "./crops-list/crops-list";
import BarangayList from "./barangay-list/barangay-list";
import ClaimDetail from "./claim-list/claim-detail";

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

  return (
    <Shell
      drawerItems={drawerItems}
      fullName={"XXX"}
      avatar={""}
      onLogout={handleLogout}
    >
      <>
        <Switch>
          <Route exact path={`${path}/farms`}>
            <FarmList />
          </Route>
          <Route exact path={`${path}/claims`}>
            <ClaimList />
          </Route>
          <Route exact path={`${path}/claims/:claimId`}>
            <ClaimDetail />
          </Route>
          <Route exact path={`${path}/crops`}>
            <CropList />
          </Route>
          <Route exact path={`${path}/barangays`}>
            <BarangayList />
          </Route>
        </Switch>
      </>
    </Shell>
  );
};

export default AdminPage;
