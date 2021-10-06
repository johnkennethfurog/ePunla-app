import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import drawerItems from "./+utils/drawer-items";
import FarmList from "./farm-list/farm-list";
import ClaimList from "./claim-list/claim-list";

import { useEffect } from "react";
import Shell from "../../components/shell/shell";
import CropList from "./crops-list/crops-list";
import BarangayList from "./barangay-list/barangay-list";
import ClaimDetail from "./claim-list/claim-detail";
import Dashboard from "./dashboard/dashboard";

const AdminPage = () => {
  const { path } = useRouteMatch();

  useEffect(() => {}, []);

  const handleLogout = () => {};

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
          <Route exact path={`${path}/`}>
            <Dashboard />
          </Route>
        </Switch>
      </>
    </Shell>
  );
};

export default AdminPage;
