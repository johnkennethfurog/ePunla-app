import { makeStyles } from "@material-ui/core";
import React from "react";
import DoaLogo from "../../assets/department_of_agri.png";
import TanauanLogo from "../../assets/tanauan_logo.png";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fafafa",
    alignItems: "center",
    height: "100%",
    padding: theme.spacing(2),
  },
  header: {
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: 10,
    marginRight: 10,
  },
}));

const Pageloader = () => {
  const style = useStyle();
  return (
    <div className={style.root}>
      {/* <div className={style.header}>
        <img className={style.logo} src={DoaLogo} />
        <img className={style.logo} src={TanauanLogo} />
      </div> */}
    </div>
  );
};

export default Pageloader;
