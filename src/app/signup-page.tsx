import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import DoaLogo from "../assets/department_of_agri.png";
import TanauanLogo from "../assets/tanauan_logo.png";
import ButtonLoading from "../components/button-loading/button-loading";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp, validateMobileNumber } from "./+states/userSlice";
import { useHistory } from "react-router";
import { showError } from "./+states/messagePromptSlice";
import { SimpleDropDown } from "../components/select/selects";
import { LookupItem } from "../models/lookup-item";
import ErrorAlert from "../components/error-alert/error-alert";
import { fetchBarangays, selectBarangay } from "./+states/commonSlice";
import ImageUploader, {
  ProfileUploader,
} from "../components/image-uploader/image-uploader";
import { uploadPhoto } from "../features/farmer/farmerActions";
import { ImageUploadResponse } from "../models/image-upload-response";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: theme.spacing(2),
  },
  signinform: {
    padding: theme.spacing(2),
    maxWidth: 500,
  },
  textField: {
    marginTop: theme.spacing(0.5),
    backgroundColor: "white",
  },
  actionDiv: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
  },
  logo: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    display: "flex",
    justifyContent: "center",
  },
  title: { textAlign: "center", marginTop: theme.spacing(4) },
  subtitle: { textAlign: "center" },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const getSteps = () => {
  return ["Login Credentials", "Personal Information", "Address"];
};

const SignupPage = () => {
  const style = useStyle();
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const steps = getSteps();
  const barangays = useSelector(selectBarangay);

  const [activeStep, setActiveStep] = useState(0);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [barangayLookup, setBarangayLookup] = useState<LookupItem[]>(() => []);
  const [areaLookup, setAreaLookup] = useState<LookupItem[]>(() => []);
  const [imageToUpload, setImageToUpload] = useState<File>();
  const [imageToUploadPreview, setImageToUploadPreview] = useState<string>("");

  const [mobileNumber, bindMobileNumber] = useInput("");
  const [password, bindPassword] = useInput("");
  const [confirmPassword, bindConfirmPassword] = useInput("");

  const [firstName, bindFirstName] = useInput("");
  const [lastName, bindLastName] = useInput("");
  const [middleName, bindMiddleName] = useInput("");

  const [streetAddress, bindAddress] = useInput("");
  const [areaId, bindAreaId] = useInput<string | number>("");
  const [barangayId, bindBarangayId] = useInput<string | number>("");

  useEffect(() => {
    // use full screen to adjust screen design
  }, [fullScreen]);

  useEffect(() => {
    dispatch(fetchBarangays());
  }, []);

  useEffect(() => {
    const lookup = barangays.map((x) => {
      return {
        value: x.barangay,
        id: x.barangayId,
      } as LookupItem;
    });
    setBarangayLookup(lookup);
  }, [barangays]);

  useEffect(() => {
    if (!barangayId || barangays.length < 1) {
      return;
    }

    const brgy = barangays.find((x) => x.barangayId === barangayId);
    const lookup = brgy.areas.map((x) => {
      return {
        value: x.area,
        id: x.barangayAreaId,
      } as LookupItem;
    });

    setAreaLookup(lookup);
  }, [barangayId, barangays]);

  const LoginCredential = (readOnly?: boolean) => {
    return (
      <>
        {/* MOBILE NUMBER */}
        <Grid item xs={12}>
          <FormControl
            className={clsx(style.textField)}
            fullWidth
            required
            variant="outlined"
          >
            <InputLabel htmlFor="mobile-number">Mobile Number</InputLabel>
            <OutlinedInput
              inputProps={{ maxLength: 10 }}
              readOnly={readOnly}
              label="Mobile Number"
              id="mobile-number"
              {...bindMobileNumber}
              startAdornment={
                <InputAdornment position="start">+63</InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        {!readOnly && (
          <>
            {/* PASSWORD */}
            <Grid item xs={12}>
              <FormControl
                className={clsx(style.textField)}
                fullWidth
                required
                variant="outlined"
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  label="Password"
                  {...bindPassword}
                  readOnly={readOnly}
                  type={showPass ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            {/* CONFIRM PASSWORD */}
            <Grid item xs={12}>
              <FormControl
                className={clsx(style.textField)}
                fullWidth
                required
                variant="outlined"
              >
                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirm-password"
                  label="Confirm Password"
                  {...bindConfirmPassword}
                  readOnly={readOnly}
                  type={showConfirmPass ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        edge="end"
                      >
                        {showPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </>
        )}
      </>
    );
  };

  const PersonalInformation = (readOnly?: boolean) => {
    return (
      <>
        <Grid
          style={{ display: "flex", flexDirection: "column" }}
          alignItems="center"
          justify="center"
          item
          xs={12}
        >
          {/* PROFILE PICTURE */}
          <ProfileUploader
            image={imageToUploadPreview}
            onSelectImage={(x) => {
              setImageToUpload(x);
              setImageToUploadPreview(URL.createObjectURL(x));
            }}
          />
        </Grid>
        {/* FIRST NAME */}
        <Grid item xs={12}>
          <FormControl
            className={clsx(style.textField)}
            fullWidth
            required
            variant="outlined"
          >
            <InputLabel htmlFor="first-name">First Name</InputLabel>
            <OutlinedInput
              label="First Name"
              id="first-name"
              readOnly={readOnly}
              {...bindFirstName}
            />
          </FormControl>
        </Grid>

        {/* LAST NAME */}
        <Grid item xs={12}>
          <FormControl
            className={clsx(style.textField)}
            fullWidth
            required
            variant="outlined"
          >
            <InputLabel htmlFor="last-name">Last Name</InputLabel>
            <OutlinedInput
              label="First Name"
              id="last-name"
              readOnly={readOnly}
              {...bindLastName}
            />
          </FormControl>
        </Grid>

        {/* MIDDLE NAME */}
        <Grid item xs={12}>
          <FormControl
            className={clsx(style.textField)}
            fullWidth
            variant="outlined"
          >
            <InputLabel htmlFor="middle-name">Middle Name</InputLabel>
            <OutlinedInput
              label="Middle Name"
              id="middle-name"
              readOnly={readOnly}
              {...bindMiddleName}
            />
          </FormControl>
        </Grid>
      </>
    );
  };

  const Address = (readOnly?: boolean) => {
    return (
      <>
        {/* BARANGAY */}
        <Grid item xs={12}>
          <SimpleDropDown
            label="Barangay"
            required
            fullWidth
            readOnly={readOnly}
            className={style.textField}
            bind={bindBarangayId}
            options={barangayLookup}
            hideEmptyOption={true}
          />
        </Grid>

        {/* BARANGAY AREA */}
        <Grid item xs={12}>
          <SimpleDropDown
            className={style.textField}
            label="Area"
            required
            readOnly={readOnly}
            fullWidth
            bind={bindAreaId}
            options={areaLookup}
            hideEmptyOption={true}
          />
        </Grid>

        {/* ADDRESS */}
        <Grid item xs={12}>
          <FormControl
            className={clsx(style.textField)}
            fullWidth
            required
            variant="outlined"
          >
            <InputLabel htmlFor="street-address">Street Address</InputLabel>
            <OutlinedInput
              rows={2}
              readOnly={readOnly}
              multiline
              label="Street Address"
              id="street-address"
              {...bindAddress}
            />
          </FormControl>
        </Grid>
      </>
    );
  };

  const ReviewInformation = () => {
    return (
      <>
        <Typography
          style={{
            textAlign: "center",
            marginBottom: 20,
            flex: 1,
          }}
          variant="h6"
          color="primary"
        >
          Review your information
        </Typography>
        {PersonalInformation(true)}
        {LoginCredential(true)}
        {Address(true)}
      </>
    );
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return LoginCredential();
      case 1:
        return PersonalInformation();
      case 2:
        return Address();
      default:
        return ReviewInformation();
    }
  };

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const onSignup = () => {
    if (!imageToUpload) {
      signup();
      return;
    }

    dispatch(
      uploadPhoto(imageToUpload, (img) => {
        signup(img);
      })
    );
  };

  const signup = (img?: ImageUploadResponse) => {
    dispatch(
      signUp(
        {
          mobileNumber,
          password,
          firstName,
          lastName,
          middleName,
          barangayId: +barangayId,
          barangayAreaId: +areaId,
          avatar: img?.url,
          avatarId: img?.publicId,
          streetAddress,
        },
        onSigninSuccess
      )
    );
  };

  const onSigninSuccess = () => {
    history.replace("/farms");
  };

  const onSignin = () => {
    history.replace("/signin");
  };

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        handleNextForCredential();
        break;
      case 1:
        handleNextForPersonalInfo();
        break;
        break;
      case 2:
        handleNextForAddress();
        break;
      default:
        break;
    }
  };

  const handleNextForCredential = () => {
    if (!password || !confirmPassword || !mobileNumber) {
      dispatch(showError("All fields are required."));
      return;
    }

    if (password !== confirmPassword) {
      dispatch(showError("Password and Confirm Password don't match"));
      return;
    }
    dispatch(validateMobileNumber(mobileNumber, gotoNext));
  };

  const handleNextForPersonalInfo = () => {
    if (!firstName || !lastName) {
      dispatch(showError("Firstname and Lastname are required."));
      return;
    }

    gotoNext();
  };

  const handleNextForAddress = () => {
    if (!barangayId || !areaId || !streetAddress) {
      dispatch(showError("All fields are required."));
      return;
    }

    gotoNext();
  };

  const gotoNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={style.root}>
      <Paper>
        <form className={style.signinform}>
          <div className={style.header}>
            <img className={style.logo} src={DoaLogo} />
            <img className={style.logo} src={TanauanLogo} />
          </div>

          <Typography className={style.title} variant="h5" color="primary">
            E-Punla
          </Typography>
          <Typography
            className={style.subtitle}
            variant="subtitle2"
            color="textSecondary"
          >
            Create an account
          </Typography>

          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: { optional?: React.ReactNode } = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel style={{ textAlign: "center" }} {...labelProps}>
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <Grid container spacing={1}>
            {getStepContent(activeStep)}
          </Grid>

          <div className={style.actionDiv}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={style.button}
            >
              Back
            </Button>

            {activeStep === steps.length ? (
              <ButtonLoading text="Sign-up" onClick={onSignup} />
            ) : (
              <>
                <ButtonLoading
                  onClick={handleNext}
                  text={
                    activeStep === steps.length - 1
                      ? "Verify Information"
                      : "Next"
                  }
                />
              </>
            )}
          </div>
          <span
            style={{
              marginTop: 10,
              flex: 1,
              fontSize: 12,
              display: "flex",
              alignItems: "center",
            }}
          >
            Already have an account?
            <Button onClick={onSignin} color="primary">
              Sign-In
            </Button>
          </span>
        </form>
      </Paper>
    </div>
  );
};

export default SignupPage;
