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
import { signIn, validateMobileNumber } from "./+states/userSlice";
import { useHistory } from "react-router";
import { showError } from "./+states/messagePromptSlice";
import { SimpleDropDown } from "../components/select/selects";
import { LookupItem } from "../models/lookup-item";
import ErrorAlert from "../components/error-alert/error-alert";

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
  textField: {},
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

  const [activeStep, setActiveStep] = useState(0);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [barangayLookup, setBarangayLookup] = useState<LookupItem[]>(() => []);
  const [areaLookup, setAreaLookup] = useState<LookupItem[]>(() => []);

  const [mobileNumber, bindMobileNumber] = useInput("");
  const [password, bindPassword] = useInput("");
  const [areaId, bindAreaId, setAreaId] = useInput<string | number>("");
  const [barangayId, bindBarangayId, setBarangayId] =
    useInput<string | number>("");

  useEffect(() => {
    // use full screen to adjust screen design
  }, [fullScreen]);

  const LoginCredential = () => {
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
              label="Mobile Number"
              id="mobile-number"
              {...bindMobileNumber}
              startAdornment={
                <InputAdornment position="start">+63</InputAdornment>
              }
            />
          </FormControl>
        </Grid>
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
              {...bindPassword}
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
      </>
    );
  };

  const PersonalInformation = () => {
    return (
      <>
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
              {...bindMobileNumber}
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
              {...bindMobileNumber}
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
              {...bindMobileNumber}
            />
          </FormControl>
        </Grid>
      </>
    );
  };

  const Address = () => {
    return (
      <>
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
              label="Street Address"
              id="street-address"
              {...bindMobileNumber}
            />
          </FormControl>
        </Grid>

        {/* BARANGAY */}
        <Grid item xs={12}>
          <SimpleDropDown
            label="Barangay"
            required
            fullWidth
            bind={bindBarangayId}
            options={barangayLookup}
            hideEmptyOption={true}
          />
        </Grid>

        {/* BARANGAY AREA */}
        <Grid item xs={12}>
          <SimpleDropDown
            label="Area"
            required
            fullWidth
            bind={bindAreaId}
            options={areaLookup}
            hideEmptyOption={true}
          />
        </Grid>
      </>
    );
  };

  const ReviewInformation = () => {
    return <div>Last PArt</div>;
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <LoginCredential />;
      case 1:
        return <PersonalInformation />;
      case 2:
        return <Address />;
      default:
        return <ReviewInformation />;
    }
  };

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const onSignup = () => {
    if (!mobileNumber || !password) {
      dispatch(showError("Username and password is required"));
      return;
    }

    dispatch(signIn(false, { mobileNumber, password }, onSigninSuccess));
  };

  const onSigninSuccess = () => {
    history.replace("/farms");
  };

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        handleNextForCredential();
        break;
      case 1:
        break;

      default:
        break;
    }
  };

  const handleNextForCredential = () => {
    dispatch(validateMobileNumber(mobileNumber, gotoNext));
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
            <Button color="primary">Sign-In</Button>
          </span>
        </form>
      </Paper>
    </div>
  );
};

export default SignupPage;
