import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@mui/material/Alert";
import { signin, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";
import useStyles from "./styles";
import Input from "./input";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup && form.password === form.confirmPassword && isVerify) {
      dispatch(signup(form, history));
    } else if (!isSignup) {
      dispatch(signin(form, history));
    } else if (isSignup && form.password !== form.confirmPassword) {
      setIsMatched(!isMatched);
    }
  };

  const googleSuccess = async (res) => {

    let token = await res?.credential;
    let decoded = jwt_decode(token);

    const result = {
      _id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      password: decoded.jti,
      imageUrl: decoded.picture,
    };

    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => {
    console.log("Google Sign In was unsuccessful. Try again later")
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
            {isSignup && (
              <ReCAPTCHA
                sitekey="6LcSui8kAAAAAG2UjvqOCT-ksGxSxBMexNYqZ-1V"
                style={{ marginLeft: 9 }}
                onChange={() => {
                  setIsVerify(!isVerify);
                }}
              />
            )}

            {isMatched && (
              <Alert
                variant="outlined"
                severity="error"
                style={{ marginLeft: 9, marginTop: 6 }}
              >
                Password and Repeat Password not match
              </Alert>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin onSuccess={googleSuccess} onError={googleError}>Sign in with Google 🚀</GoogleLogin>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <div
        style={{
          marginLeft: "550px",
          marginTop: `${isSignup ? "-450px" : "-350px"}`,
          background: "white",
        }}
      >
      </div>
    </Container>
  );
};

export default SignUp;
