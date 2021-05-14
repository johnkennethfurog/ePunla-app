import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Typography,
} from "@material-ui/core";
import ClaimRow from "./claim-row";
import useInput from "../../../hooks/useInput";
import { StatusClaimList } from "../models/status-claim.enum";
import { SimpleDropDown } from "../../../components/select/selects";
import { deleteClaim, fetchClaims } from "../farmerActions";
import { selectClaims } from "../farmerSelectors";
import ClaimRowHeader from "./claim-row-header";
import ClaimRowDetail from "./claim-row-detail";
import ConfirmationModal from "../../../components/modals/confirmation-modal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 10,
    },
    table: {},
    searchForm: {
      padding: 15,
      marginBottom: 20,
    },
  })
);

const ClaimList = () => {
  const [status, bindStatus] = useInput("");
  const [expandedClaimId, setExpandedClaimId] = useState<number>(null);
  const [claimIdToDelete, setClaimIdToDelete] = useState<number>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(() => false);

  const claims = useSelector(selectClaims);
  const dispatch = useDispatch();
  const style = useStyles();

  useEffect(() => {
    return () => {
      console.log("unmounting");
    };
  }, []);

  useEffect(() => {
    dispatch(fetchClaims(!!status ? status : null));
  }, [status]);

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

  return (
    <Paper className={style.container}>
      <form className={style.searchForm}>
        <Typography variant="subtitle1" gutterBottom>
          Search Claims
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SimpleDropDown
              id="status"
              label="Claim Status"
              fullWidth
              bind={bindStatus}
              options={StatusClaimList}
            />
          </Grid>
        </Grid>
      </form>

      <Table className={style.table} size="small" aria-label="farm table">
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

      <ConfirmationModal
        open={showDeleteModal}
        title="Delete Claim"
        content="Are you sure you want to delete this claim?"
        btnNoTitle="No"
        btnYesTitle="Yes"
        onClickBtnNo={closeDeleteModal}
        onClickBtnYes={onConfirmDelete}
      />
    </Paper>
  );
};

export default ClaimList;
