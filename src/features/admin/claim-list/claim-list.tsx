import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import ClaimRow from "./claim-row";
import { selectClaims } from "../+state/adminSelectors";
import ClaimRowHeader from "./claim-row-header";
import ClaimRowDetail from "./claim-row-detail";
import ConfirmationModal from "../../../components/modals/confirmation-modal";
import ClaimFilter from "./claim-filter";

import EmptyList from "../../../components/empty-list/empty-list";
import {
  doneAction,
  selectActionToPerform,
} from "../../../app/+states/commonSlice";
import Claim from "../+models/claim";
import { ActionModule } from "../../../models/action-module.enum";
import { ActionType } from "../../../models/action-type.enum";

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

const ClaimList = () => {
  const dispatch = useDispatch();
  const style = useStyles();

  const claims = useSelector(selectClaims);
  const actionToPerform = useSelector(selectActionToPerform);

  const [showDeleteModal, setShowDeleteModal] = useState(() => false);
  const [selectedClaim, setSelectedClaim] = useState<Claim>(() => null);
  const [expand, setExpand] = useState(() => false);

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
        setShowDeleteModal(true);
        break;

      case ActionType.AdminDeclineClaim:
        break;

      case ActionType.AdminApproveClaim:
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
    setShowDeleteModal(false);
  };

  const onConfirm = () => {};

  return (
    <>
      <Paper className={style.container}>
        <ClaimFilter />
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

        <ConfirmationModal
          open={showDeleteModal}
          title="Delete Claim"
          content="Are you sure you want to delete this claim?"
          btnNoTitle="No"
          btnYesTitle="Yes"
          onClickBtnNo={onClose}
          onClickBtnYes={onConfirm}
        />
      </Paper>
    </>
  );
};

export default ClaimList;
