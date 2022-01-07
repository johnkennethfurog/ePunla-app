import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Paper,
  Button,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PlaceHolder from "../../../assets/placeholder.jpeg";

import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import { selectClaimDetail, selectIsLoading } from "../+state/adminSelectors";
import Status from "../../../components/status/status";
import { StatusClaim } from "../../../models/status-claim.enum";
import {
  fetchClaimDetail,
  setClaimAsClaimed,
  setClaimForVerification,
} from "../+state/adminActions";
import FieldValueDisplay from "../../../components/field-value-display/FieldValueDisplay";
import ClaimValidateModal from "./claim-validate-modal";
import ConfirmationModal from "../../../components/modals/confirmation-modal";
import { selectIsSaving } from "../../farmer/+state/farmerSelectors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 30,
    },
    label: {
      display: "block",
      marginBottom: 2,
      marginTop: 10,
      fontWeight: "bold",
    },
    avatar: {
      objectFit: "cover",
      maxWidth: 120,
      height: 120,
    },
    image: {
      objectFit: "cover",
      width: 150,
      height: 150,
    },
    detailPlaceholder: {
      fontStyle: "italic",
    },
    actionContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
  })
);

const ClaimDetail = () => {
  const style = useStyles();
  const dispatch = useDispatch();

  const claim = useSelector(selectClaimDetail);
  const isLoading = useSelector(selectIsSaving);

  const param = useParams<{ claimId: string }>();

  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(() => false);
  const [isApproved, setIsApproved] = useState(() => false);

  useEffect(() => {
    loadClaimDetail();
  }, []);

  const loadClaimDetail = () => {
    const { claimId } = param;
    dispatch(fetchClaimDetail(+claimId));
  };

  const approveClaim = () => {
    setShowValidationModal(true);
    setIsApproved(true);
  };

  const declineClaim = () => {
    setShowValidationModal(true);
    setIsApproved(false);
  };

  const onClose = () => {
    setShowValidationModal(false);
  };

  // FOR MOVING TO VERIFICATION
  const forVerifyClaim = () => {
    setShowVerifyModal(true);
  };

  const onConfirm = () => {
    dispatch(setClaimForVerification(claim.claimId));
    setShowVerifyModal(false);
  };

  const onSetClaimAsClaimed = () => {
    dispatch(setClaimAsClaimed(claim.claimId));
    setShowVerifyModal(false);
  };

  const onCloseConfirmation = () => {
    setShowVerifyModal(false);
  };

  return (
    <>
      {claim?.status !== StatusClaim.Claimed &&
        claim?.status !== StatusClaim.Denied &&
        !isLoading && (
          <div className={style.actionContainer}>
            {claim?.status === StatusClaim.Approved && (
              <Button
                color="primary"
                onClick={onSetClaimAsClaimed}
                startIcon={<DoneIcon />}
              >
                Claim
              </Button>
            )}

            {claim?.status === StatusClaim.ForVerification && (
              <Button
                color="primary"
                onClick={approveClaim}
                startIcon={<DoneIcon />}
              >
                Approve
              </Button>
            )}

            {claim?.status === StatusClaim.Pending && (
              <Button
                color="primary"
                onClick={forVerifyClaim}
                startIcon={<VerifiedUserIcon />}
              >
                For Verification
              </Button>
            )}
            {claim?.status !== StatusClaim.Approved && (
              <Button
                style={{ color: "red", marginLeft: 10 }}
                onClick={declineClaim}
                startIcon={<CloseIcon />}
              >
                Decline
              </Button>
            )}
          </div>
        )}

      <Paper className={style.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <span className={style.sectionTitle}>Claim Detail</span>
          </Grid>

          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            {/* FARMER PROFILE */}
            <img className={style.avatar} src={claim?.avatar ?? PlaceHolder} />
          </Grid>
          {!!claim && (
            <Grid
              item
              container
              spacing={3}
              xs={12}
              sm={12}
              md={10}
              lg={10}
              xl={10}
            >
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                {/* REFERENCE NUMBER */}
                <FieldValueDisplay
                  field="Reference Number"
                  value={`${claim?.referenceNumber ?? "-"}`}
                />

                {/* FARMER */}
                <FieldValueDisplay
                  field="Farmer"
                  value={`${claim?.firstName} ${claim?.lastName}`}
                />

                {/* FARMER NUMBER */}
                <FieldValueDisplay
                  field="Contact No."
                  value={`+63${claim?.mobileNumber}`}
                />

                {/* FARMER ADDRESS */}
                <FieldValueDisplay
                  field="Address"
                  value={`${claim?.farmerAddress}`}
                />

                {/* FARMER Barangay */}
                <FieldValueDisplay
                  field="Area"
                  value={`${claim?.farmerArea}`}
                />

                {/* FARMER area */}
                <FieldValueDisplay
                  field="Barangay"
                  value={`${claim?.farmerBarangay}`}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                {/* FARM*/}
                <FieldValueDisplay field="Farm" value={claim?.farm} />

                {/* FARM SIZE*/}
                <FieldValueDisplay
                  field="Size"
                  value={`${claim?.farmSize} sqm.`}
                />

                {/* FARM ADDRESS */}
                <FieldValueDisplay
                  field="Address"
                  value={`${claim?.address}`}
                />

                {/* FARM Barangay */}
                <FieldValueDisplay field="Area" value={`${claim?.area}`} />

                {/* FARM area */}
                <FieldValueDisplay
                  field="Barangay"
                  value={`${claim?.barangay}`}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {/* DATE FILED */}
                <FieldValueDisplay
                  field="Date Filed"
                  value={moment(claim?.filingDate).format("MMM DD,YYYY")}
                />

                {/* CROP */}
                <FieldValueDisplay field="Crop" value={claim?.crop} />

                {/* Damaged Area */}
                <FieldValueDisplay
                  field="Damaged Area"
                  value={`${claim?.totalDamagedArea} sqm.`}
                />

                {/* Damage Cause */}
                <FieldValueDisplay
                  field="Cause"
                  value={claim?.damageCause
                    .filter((x) => x.damagedAreaSize > 0)
                    .map(
                      (dmg) => `${dmg.damageType} (${dmg.damagedAreaSize} sqm.)`
                    )
                    .join(",")}
                />

                {/* DESCRIPTION */}
                <span className={style.label}>Description:</span>
                {!!claim?.description && <span>{claim?.description}</span>}
                {!claim?.description && (
                  <span className={style.detailPlaceholder}>
                    No Description provided.
                  </span>
                )}
              </Grid>

              {/* ATTACHED IMAGE */}
              {!!claim?.photoUrl && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <span className={style.label}>Attachment:</span>
                  <img
                    className={style.image}
                    src={claim?.photoUrl ?? PlaceHolder}
                  />
                </Grid>
              )}

              <Grid item>
                {/* STATUS */}
                <span className={style.label}>
                  <span style={{ marginRight: 10 }}>Status:</span>
                  <Status
                    pendingStatus={StatusClaim.Pending}
                    cancelledStatus={StatusClaim.Denied}
                    approvedStatus={StatusClaim.Claimed}
                    status={claim?.status}
                  />
                </span>

                {/* VALIDATION DATE */}
                {!!claim?.validationDate && (
                  <FieldValueDisplay
                    field="Date Validated:"
                    value={moment(claim?.validationDate).format("MMM DD,YYYY")}
                  />
                )}

                {/* VALIDATION REMARKS */}
                {!!claim?.remarks && (
                  <>
                    <span className={style.label}>Validation Remarks:</span>
                    <span>{claim?.remarks}</span>
                  </>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>

      <ClaimValidateModal
        isApproved={isApproved}
        claimId={claim?.claimId}
        isOpen={showValidationModal}
        onClose={onClose}
      />

      <ConfirmationModal
        open={showVerifyModal}
        title="Set Claim for Verification"
        content="Are you sure you want to move this claim for verification?"
        onClickBtnNo={onCloseConfirmation}
        onClickBtnYes={onConfirm}
      />
    </>
  );
};

export default ClaimDetail;
