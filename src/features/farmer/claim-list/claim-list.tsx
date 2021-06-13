import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import ClaimRow from "./claim-row";
import { deleteClaim } from "../+state/farmerActions";
import {
  selectClaims,
  selectIsPending,
  selectSelectedClaim,
} from "../+state/farmerSelectors";
import ClaimRowHeader from "./claim-row-header";
import ClaimRowDetail from "./claim-row-detail";
import ConfirmationModal from "../../../components/modals/confirmation-modal";
import ClaimFilter from "./claim-filter";
import ClaimFormModal from "./claim-form-modal";
import AddIcon from "@material-ui/icons/Add";
import EmptyList from "../../../components/empty-list/empty-list";

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

  const selectedClaim = useSelector(selectSelectedClaim);
  const claims = useSelector(selectClaims);
  const isPending = useSelector(selectIsPending);

  const [expandedClaimId, setExpandedClaimId] = useState<number>(null);
  const [claimIdToDelete, setClaimIdToDelete] = useState<number>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(() => false);
  const [showClaimFormModal, setShowClaimFormModal] = React.useState(
    () => false
  );

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    if (!!selectedClaim) {
      setShowClaimFormModal(true);
    }
  }, [selectedClaim]);

  const onDelete = (claimId: number) => {
    setClaimIdToDelete(claimId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const onConfirmDelete = () => {
    setShowDeleteModal(false);
    dispatch(deleteClaim(claimIdToDelete));
  };

  const openClaimFormModal = () => {
    setShowClaimFormModal(true);
  };

  const closeFormModal = () => {
    setShowClaimFormModal(false);
  };

  return (
    <>
      {!isPending && (
        <div className={style.newButtonDiv}>
          <Button
            color="primary"
            onClick={openClaimFormModal}
            startIcon={<AddIcon />}
          >
            Create New
          </Button>
        </div>
      )}

      <Paper className={style.container}>
        <ClaimFilter />
        <Table className={style.table} aria-label="farm table">
          <ClaimRowHeader />
          <TableBody>
            {claims.map((claim) => {
              const isOpen = expandedClaimId === claim.claimId;

              return (
                <Fragment key={claim.claimId.toString()}>
                  <ClaimRow
                    isOpen={isOpen}
                    onDelete={onDelete}
                    onExpand={() => {
                      if (!isOpen) {
                        setExpandedClaimId(claim.claimId);
                      } else {
                        setExpandedClaimId(null);
                      }
                    }}
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
          onClickBtnNo={closeDeleteModal}
          onClickBtnYes={onConfirmDelete}
        />
        <ClaimFormModal
          onClose={closeFormModal}
          isOpen={showClaimFormModal}
          claim={selectedClaim}
        />
      </Paper>
    </>
  );
};

export default ClaimList;
