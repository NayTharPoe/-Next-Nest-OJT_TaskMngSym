/* eslint-disable @next/next/no-img-element */
import AuthButton from "@/components/authBtn";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import AuthDialog from "@/components/authDialog";
import Loading from "@/components/loading";
import config from "@/config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "transparent",
  outline: "none",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any): void => {
    setIsLoading(true);
    axios
      .post(`${config.SERVER_DOMAIN}/auth/login`, data)
      .then((res: any) => {
        const userData = res.data.result;
        localStorage.setItem("user", JSON.stringify(userData));
        setIsLoading(false);
        router.push("/");
      })
      .catch((err) => {
        setIsLoading(false);
        setOpen(true);
        setMessage(err.response?.data.message);
      });
  };

  return (
    <>
      {isLoading && <Loading />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid
            item
            md={6}
            sx={{
              display: { xs: "none", md: "flex" },
              background:
                "linear-gradient(20deg,#2f3136 0.89%,rgba(47, 49, 54, 0) 103.49%)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "70%", height: "auto", objectFit: "cover" }}
              src="/auth-img/login.png"
              alt="login-img"
            />
          </Grid>
          <Grid
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            item
            sx={{
              backgroundImage: {
                xs: `url('/auth-img/login.png')`,
                md: "none",
              },
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            md={6}
            xs={12}
          >
            <Card
              sx={{
                background: "#fff",
                opacity: "95%",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                padding: "20px",
              }}
            >
              <Typography textAlign="center" variant="h4">
                LogIn to TaskSphere
              </Typography>
              <Stack
                sx={{
                  width: { xs: "270px", sm: "380px" },
                }}
                mt={4}
                spacing={3}
              >
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={field.value || ""}
                      name="email"
                      type="email"
                      style={{ borderRadius: "25px" }}
                      onChange={(e) => field.onChange(e.target.value)}
                      label="Enter your email"
                      error={!!errors.email}
                      helperText={errors.email?.message as string}
                      fullWidth
                    ></TextField>
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      name="password"
                      value={field.value || ""}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => field.onChange(e.target.value)}
                      label="Enter your password"
                      error={!!errors.password}
                      helperText={errors.password?.message as string}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    ></TextField>
                  )}
                />
              </Stack>
              <Stack mt={2}>
                <Link
                  style={{ color: "#2f3136" }}
                  textAlign="end"
                  underline="none"
                  href="/auth/forget-password"
                >
                  {"Forget Password?"}
                </Link>
              </Stack>
              <AuthButton>Login</AuthButton>
              <AuthDialog open={open} close={handleClose}>
                {message}
              </AuthDialog>
            </Card>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Login;
