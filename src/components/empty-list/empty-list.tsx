import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { Theme } from "@testing-library/dom/node_modules/pretty-format";
import EmptyImage from "../../assets/empty.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 50,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    img: {
      height: 90,
      width: 90,
    },
    lbl: {
      fontSize: 15,
      marginTop: 15,
      color: "gray",
    },
  })
);

type EmptyListProps = {
  label?: string;
};

const EmptyList = (props: EmptyListProps) => {
  const { label } = props;
  const style = useStyles();
  return (
    <div className={style.container}>
      <img className={style.img} src={EmptyImage} />
      <span className={style.lbl}>{label || "This is empty"}</span>
    </div>
  );
};

export default EmptyList;
