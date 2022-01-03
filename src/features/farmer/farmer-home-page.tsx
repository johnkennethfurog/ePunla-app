import React, { Suspense } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
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
import drawerItems from "./+utils/drawer-items";

const FarmList = React.lazy(() => import("./farm-list/farm-list"));
const ClaimList = React.lazy(() => import("./claim-list/claim-list"));
const CropList = React.lazy(() => import("./crops-list/crops-list"));
const Dashboard = React.lazy(() => import("./dashboard/dashboard"));

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
            <Suspense fallback={<></>}>
              <FarmList />
            </Suspense>
          </Route>
          <Route exact path="/claims">
            <Suspense fallback={<></>}>
              <ClaimList />
            </Suspense>
          </Route>
          <Route exact path="/crops">
            <Suspense fallback={<></>}>
              <CropList />
            </Suspense>
          </Route>

          <Route exact path="/dashboard">
            <Suspense fallback={<></>}>
              <Dashboard />
            </Suspense>
          </Route>
        </Switch>
      </>
    </Shell>
  );
};

export default HomePage;
