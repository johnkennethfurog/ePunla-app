import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { logout } from "../../app/+states/userSlice";
import Pageloader from "../../components/page-loader/page-loader";

import Shell from "../../components/shell/shell";
import { fetchProfile } from "./+state/adminActions";
import { selectName } from "./+state/adminSelectors";
import drawerItems from "./+utils/drawer-items";

const CropList = React.lazy(() => import("./crops-list/crops-list"));
const FarmList = React.lazy(() => import("./farm-list/farm-list"));
const ClaimList = React.lazy(() => import("./claim-list/claim-list"));
const BarangayList = React.lazy(() => import("./barangay-list/barangay-list"));
const ClaimDetail = React.lazy(() => import("./claim-list/claim-detail"));
const Dashboard = React.lazy(() => import("./dashboard/dashboard"));
const TermsAndConditions = React.lazy(
  () => import("../../app/terms-and-conditions")
);

const AdminPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();

  const name = useSelector(selectName);

  React.useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  const handleLogout = () => {
    history.push("/admin/signin");
    dispatch(logout());
  };

  return (
    <Shell
      drawerItems={drawerItems}
      fullName={name}
      avatar={""}
      onLogout={handleLogout}
    >
      <>
        <Switch>
          <Route exact path={`${path}/farms`}>
            <FarmList />
          </Route>
          <Route exact path={`${path}/claims`}>
            <Suspense fallback={<Pageloader />}>
              <ClaimList />
            </Suspense>
          </Route>
          <Route exact path={`${path}/claims/:claimId`}>
            <Suspense fallback={<Pageloader />}>
              <ClaimDetail />
            </Suspense>
          </Route>
          <Route exact path={`${path}/crops`}>
            <Suspense fallback={<Pageloader />}>
              <CropList />
            </Suspense>
          </Route>
          <Route exact path={`${path}/barangays`}>
            <Suspense fallback={<Pageloader />}>
              <BarangayList />
            </Suspense>
          </Route>
          <Route exact path={`${path}/dashboard`}>
            <Suspense fallback={<Pageloader />}>
              <Dashboard />
            </Suspense>
          </Route>

          <Route exact path={`${path}/terms-and-conditions`}>
            <Suspense fallback={<Pageloader />}>
              <TermsAndConditions />
            </Suspense>
          </Route>
        </Switch>
      </>
    </Shell>
  );
};

export default AdminPage;
