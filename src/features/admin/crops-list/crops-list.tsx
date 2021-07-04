import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import {
  makeStyles,
  Theme,
  createStyles,
  Button,
  TablePagination,
} from "@material-ui/core";
import CropRow from "./crops-row";
import CropsFilter from "./crops-filter";
import { selectCrops, selectCropsPageCount } from "../+state/adminSelectors";
import CropRowHeader from "./crops-row-header";
import { Crop } from "../+models/crop";
import ConfirmationModal from "../../../components/modals/confirmation-modal";
// import { deleteCrop } from "../+state/farmerActions";
import {
  doneAction,
  selectActionToPerform,
} from "../../../app/+states/commonSlice";
import { ActionType } from "../../../models/action-type.enum";
import { ActionModule } from "../../../models/action-module.enum";
import AddIcon from "@material-ui/icons/Add";
// import CropsSaveModal from "./crops-save-modal";
import EmptyList from "../../../components/empty-list/empty-list";
import CropRowDetail from "./crops-row-detail";
import BannerCropToHarvest from "../../../components/banner-crop-to-harvest/banner-crop-to-harvest";
import CropsSaveModal from "./crops-save-modal";

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

const CropList = () => {
  const style = useStyles();
  const dispatch = useDispatch();

  const [selectedCrop, setSelectedCrop] = useState<Crop>();
  const [showDeleteModal, setShowDeleteModal] = useState(() => false);
  const [showCropFormModal, setShowCropFormModal] = useState(() => false);
  const [expand, setExpand] = useState(() => false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const crops = useSelector(selectCrops);
  const actionToPerform = useSelector(selectActionToPerform);
  const pageCount = useSelector(selectCropsPageCount);

  useEffect(() => {
    if (!actionToPerform) return;

    const { actionType, data, actionModule, expand } = actionToPerform;
    let crop = data as Crop;

    if (actionModule !== ActionModule.AdminCropsModule) return;

    setSelectedCrop(crop);

    switch (actionType) {
      case ActionType.AdminDeleteCrops:
        setShowDeleteModal(true);
        break;

      case ActionType.AdminUpdateCrops:
        setShowCropFormModal(true);
        break;

      case ActionType.AdminExpandCollapsedCrops:
        setExpand(expand);
        break;

      default:
        break;
    }

    // Notify reducer action is already done
    dispatch(doneAction());
  }, [actionToPerform]);

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const onConfirmDelete = () => {
    // dispatch(deleteCrop(selectedCrop?.farmCropId));
    setShowDeleteModal(false);
  };

  const enrollCrop = () => {
    setSelectedCrop(null);
    setShowCropFormModal(true);
  };

  const closeFormModal = () => {
    setShowCropFormModal(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  return (
    <>
      <div className={style.newButtonDiv}>
        <Button color="primary" onClick={enrollCrop} startIcon={<AddIcon />}>
          Create New
        </Button>
      </div>
      <Paper className={style.container}>
        <CropsFilter pageNumber={pageNumber} pageSize={pageSize} />
        <Table className={style.table} aria-label="crop table" size="small">
          <CropRowHeader />
          <TableBody>
            {crops.map((crop) => {
              const isOpen = selectedCrop?.cropId === crop.cropId && expand;

              return (
                <Fragment key={crop.cropId.toString()}>
                  <CropRow isOpen={isOpen} crop={crop} />
                  <CropRowDetail isOpen={isOpen} crop={crop} />
                </Fragment>
              );
            })}
          </TableBody>
        </Table>

        {crops.length === 0 && <EmptyList label="No crops." />}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pageCount}
          rowsPerPage={pageSize}
          page={pageNumber}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

        <ConfirmationModal
          open={showDeleteModal}
          title="Delete Crop"
          content="Are you sure you want to delete this crop?"
          btnNoTitle="No"
          btnYesTitle="Yes"
          onClickBtnNo={closeDeleteModal}
          onClickBtnYes={onConfirmDelete}
        />

        <CropsSaveModal
          isOpen={showCropFormModal}
          crop={selectedCrop}
          onClose={closeFormModal}
        />
      </Paper>
    </>
  );
};

export default CropList;
