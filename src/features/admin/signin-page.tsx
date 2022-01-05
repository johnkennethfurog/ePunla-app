import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect } from "react";
import clsx from "clsx";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockIcon from "@material-ui/icons/Lock";
import AppLogo from "../../assets/logo.png";
import ButtonLoading from "../../components/button-loading/button-loading";
import useInput from "../../hooks/useInput";
import { useDispatch } from "react-redux";
import { signIn } from "../../app/+states/userSlice";
import { useHistory } from "react-router";
import { showError } from "../../app/+states/messagePromptSlice";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    padding: theme.spacing(2),
    backgroundColor: "#fafafa",
  },
  signinform: {
    padding: theme.spacing(2),
    maxWidth: 350,
  },
  textField: { marginTop: theme.spacing(2) },
  actionDiv: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(3),
  },
  logo: {
    width: 200,
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    display: "flex",
    justifyContent: "center",
  },
  title: { textAlign: "center", marginTop: theme.spacing(3) },
  subtitle: { textAlign: "center" },
}));

const AdminSigninPage = () => {
  const style = useStyle();
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const [showPass, setShowPass] = React.useState<boolean>(false);

  const [email, bindEmail] = useInput("");
  const [password, bindPassword] = useInput("");

  useEffect(() => {
    // use full screen to adjust screen design
  }, [fullScreen]);

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const onSignin = () => {
    if (!email || !password) {
      dispatch(showError("Username and password is required"));
      return;
    }

    dispatch(signIn(true, { email, password }, onSigninSuccess));
  };

  const onSigninSuccess = () => {
    history.replace("/admin/dashboard");
  };

  return (
    <div className={style.root}>
      <Paper>
        <form className={style.signinform}>
          <div className={style.header}>
            <img className={style.logo} src={AppLogo} />
            {/* <img className={style.logo} src={TanauanLogo} /> */}
          </div>
          <Typography
            className={style.subtitle}
            variant="subtitle2"
            color="textSecondary"
          >
            Login to your account
          </Typography>

          <FormControl
            className={clsx(style.textField)}
            fullWidth
            variant="outlined"
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput label="Email" id="email" {...bindEmail} />
          </FormControl>

          <FormControl
            className={clsx(style.textField)}
            fullWidth
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
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon style={{ color: "gray" }} />
                </InputAdornment>
              }
            />
          </FormControl>

          <div className={style.actionDiv}>
            <ButtonLoading text="Sign In" onClick={onSignin} />
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default AdminSigninPage;
