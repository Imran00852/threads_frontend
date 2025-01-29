import {
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLoginMutation, useSignupMutation } from "../redux/service";
import { toast, Bounce } from "react-toastify";
import Loader from "../components/common/Loader";

const Register = () => {
  const [signupUser, signupUserData] = useSignupMutation();
  const [loginUser, loginUserData] = useLoginMutation();
  // custom media query hooks
  const _700 = useMediaQuery("(min-width:700px)");

  //form handling
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginToggle = () => {
    setLogin((pre) => !pre);
  };
  const handleLogin = async () => {
    const data = {
      email,
      password,
    };

    await loginUser(data);
  };
  const handleRegister = async () => {
    const data = {
      username,
      email,
      password,
    };
    await signupUser(data);
  };
  useEffect(() => {
    if (signupUserData.isSuccess) {
      toast.success(signupUserData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
    if (signupUserData.isError) {
      toast.error(signupUserData.error.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [signupUserData.isSuccess, signupUserData.isError]);

  useEffect(() => {
    if (loginUserData.isSuccess) {
      toast.success(loginUserData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
    if (loginUserData.isError) {
      toast.error(loginUserData.error.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [loginUserData.isSuccess, loginUserData.isError]);

  if (signupUserData.isLoading || loginUserData.isLoading) {
    return (
      <Stack height={"90vh"} alignItems={"center"} justifyContent={"center"}>
        <Loader />
      </Stack>
    );
  }
  return (
    <>
      <Stack
        width={"100%"}
        height={"100vh"}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={
          _700
            ? {
                backgroundImage: 'url("/register-bg.webp")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 600px",
              }
            : null
        }
      >
        <Stack mt={_700 ? 20 : 0} width={_700 ? "40%" : "90%"} gap={2}>
          <Typography
            variant="h5"
            fontSize={_700 ? "1.5rem" : "1rem"}
            fontWeight={"bold"}
            alignSelf={"center"}
          >
            {login ? "Login with Email" : "Register with Email"}
          </Typography>
          {login ? null : (
            <TextField
              variant="outlined"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <TextField
            variant="outlined"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            size="large"
            sx={{
              bgcolor: "green",
              height: 52,
              color: "white",
              ":hover": {
                bgcolor: "blue",
              },
            }}
            onClick={login ? handleLogin : handleRegister}
          >
            {login ? "Login" : "Sign Up"}
          </Button>
          <Typography
            variant="subtitle2"
            alignSelf={"center"}
            fontSize={_700 ? "1.3rem" : "1rem"}
          >
            {login ? "Don't have an account?" : "Already have an account?"}
            <span className="login-link" onClick={loginToggle}>
              {login ? "Sign Up" : "Login"}
            </span>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Register;
