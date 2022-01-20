import React from "react";
import { useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import CropRow from "./crops-row";
import CropsFilter from "./crops-filter";
import { selectOccuranceCrops } from "../+state/adminSelectors";
import CropRowHeader from "./crops-row-header";

import EmptyList from "../../../components/empty-list/empty-list";
import CropOccurancePrint from "./crops-occurancy-print";
import { ButtonPrint } from "../../../components/button-print/button-print";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 10,
    },
    table: {},
    newButtonDiv: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 10,
    },
  })
);

const OccuranceCropList = () => {
  const style = useStyles();

  const crops = useSelector(selectOccuranceCrops);

  const [OpenPrint, setOpenPrint] = React.useState(false);

  return (
    <div>
      <CropOccurancePrint
        isOpen={OpenPrint}
        onClose={() => setOpenPrint(false)}
        statData={crops}
      />
      <ButtonPrint onClick={() => setOpenPrint(true)} />
      <Paper className={style.container}>
        <CropsFilter />
        <Table className={style.table} aria-label="crop table" size="small">
          <CropRowHeader />
          <TableBody>
            {crops.map((crop, ind) => {
              return <CropRow key={ind} crop={crop} />;
            })}
          </TableBody>
        </Table>

        {crops.length === 0 && <EmptyList label="No crops occurance" />}
      </Paper>
    </div>
  );
};

export default OccuranceCropList;
