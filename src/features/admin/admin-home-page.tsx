import React, { Suspense } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Shell from "../../components/shell/shell";
import drawerItems from "./+utils/drawer-items";

const CropList = React.lazy(() => import("./crops-list/crops-list"));
const FarmList = React.lazy(() => import("./farm-list/farm-list"));
const ClaimList = React.lazy(() => import("./claim-list/claim-list"));
const BarangayList = React.lazy(() => import("./barangay-list/barangay-list"));
const ClaimDetail = React.lazy(() => import("./claim-list/claim-detail"));
const Dashboard = React.lazy(() => import("./dashboard/dashboard"));

const AdminPage = () => {
  const { path } = useRouteMatch();

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
            <Suspense fallback={<></>}>
              <ClaimList />
            </Suspense>
          </Route>
          <Route exact path={`${path}/claims/:claimId`}>
            <Suspense fallback={<></>}>
              <ClaimDetail />
            </Suspense>
          </Route>
          <Route exact path={`${path}/crops`}>
            <Suspense fallback={<></>}>
              <CropList />
            </Suspense>
          </Route>
          <Route exact path={`${path}/barangays`}>
            <Suspense fallback={<></>}>
              <BarangayList />
            </Suspense>
          </Route>
          <Route exact path={`${path}/dashboard`}>
            <Suspense fallback={<></>}>
              <Dashboard />
            </Suspense>
          </Route>
        </Switch>
      </>
    </Shell>
  );
};

export default AdminPage;
