import { makeStyles } from "@material-ui/core";
import React from "react";
import Lottie from "lottie-react";
import animationData from "../../lottie/page-loading.json";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fafafa",
    alignItems: "center",
    height: "100vh",
    padding: theme.spacing(2),
  },
  header: {
    display: "flex",
    justifyContent: "center",
  },
}));

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};

const Pageloader = () => {
  const style = useStyle();
  return (
    <div className={style.root}>
      <Lottie
        style={{
          height: 300,
          width: 300,
        }}
        {...defaultOptions}
      />
    </div>
  );
};

export default Pageloader;
