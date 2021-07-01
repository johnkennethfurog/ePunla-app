import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import ClaimRow from "./claim-row";
import { selectClaims, selectClaimsPageCount } from "../+state/adminSelectors";
import ClaimRowHeader from "./claim-row-header";
import ClaimRowDetail from "./claim-row-detail";
import TablePagination from "@material-ui/core/TablePagination";
import ClaimFilter from "./claim-filter";

import EmptyList from "../../../components/empty-list/empty-list";
import {
  doneAction,
  selectActionToPerform,
} from "../../../app/+states/commonSlice";
import Claim from "../+models/claim";
import { ActionModule } from "../../../models/action-module.enum";
import { ActionType } from "../../../models/action-type.enum";
import ClaimValidateModal from "./claim-validate-modal";
import { useReactToPrint } from "react-to-print";
import ClaimListToPrint from "./claim-list-to-print";
import PrintIcon from "@material-ui/icons/Print";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 10,
    },
    table: {},
    printButtonDiv: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 10,
    },
    toPrintContainer: {
      display: "none",
    },
  })
);

const ClaimList = () => {
  const dispatch = useDispatch();
  const style = useStyles();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Claims",
  });

  const claims = useSelector(selectClaims);
  const pageCount = useSelector(selectClaimsPageCount);

  const actionToPerform = useSelector(selectActionToPerform);

  const [showValidationModal, setShowValidationModal] = useState(() => false);
  const [selectedClaim, setSelectedClaim] = useState<Claim>(() => null);
  const [expand, setExpand] = useState(() => false);
  const [isApproved, setIsApproved] = useState(() => false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    if (!actionToPerform) return;

    const { actionType, data, actionModule, expand } = actionToPerform;
    let claim = data as Claim;

    if (actionModule !== ActionModule.AdminClaimsModile) return;

    setSelectedClaim(claim);

    switch (actionType) {
      case ActionType.DeleteFarm:
        setShowValidationModal(true);
        break;

      case ActionType.AdminDeclineClaim:
        setIsApproved(false);
        setShowValidationModal(true);
        break;

      case ActionType.AdminApproveClaim:
        setIsApproved(true);
        setShowValidationModal(true);
        break;

      case ActionType.ExpandCollapsedFarm:
        setExpand(expand);
        // do nothing
        break;

      default:
        break;
    }

    // Notify reducer action is already done
    dispatch(doneAction());
  }, [actionToPerform]);

  const onClose = () => {
    setShowValidationModal(false);
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

  const onPrint = () => {
    if (claims.length > 0) {
      handlePrint();
    }
  };

  return (
    <>
      <div className={style.printButtonDiv}>
        <Button color="primary" onClick={onPrint} startIcon={<PrintIcon />}>
          Print
        </Button>
      </div>

      <div className={style.toPrintContainer}>
        <div ref={componentRef}>
          <ClaimListToPrint claims={claims} />
        </div>
      </div>

      <Paper className={style.container}>
        <ClaimFilter pageNumber={pageNumber} pageSize={pageSize} />
        <Table className={style.table} aria-label="farm table">
          <ClaimRowHeader />
          <TableBody>
            {claims.map((claim) => {
              const isOpen = selectedClaim?.claimId === claim.claimId && expand;

              return (
                <Fragment key={claim.claimId.toString()}>
                  <ClaimRow
                    isOpen={isOpen}
                    claim={claim}
                    key={claim.claimId.toString()}
                  />
                  <ClaimRowDetail
                    claim={claim}
                    isOpen={isOpen}
                    key={claim.claimId.toString() + "_detail"}
                  />
                </Fragment>
              );
            })}
          </TableBody>
        </Table>

        {claims.length === 0 && (
          <EmptyList label="You don't have any claims." />
        )}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pageCount}
          rowsPerPage={pageSize}
          page={pageNumber}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

        <ClaimValidateModal
          isApproved={isApproved}
          claimId={selectedClaim?.claimId}
          isOpen={showValidationModal}
          onClose={onClose}
        />
      </Paper>
    </>
  );
};

export default ClaimList;
