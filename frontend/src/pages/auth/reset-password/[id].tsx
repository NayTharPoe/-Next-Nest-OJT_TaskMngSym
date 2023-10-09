/* eslint-disable @next/next/no-img-element */
import AuthButton from "@/components/authBtn";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  Box,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import axios from "axios";
import AuthDialog from "@/components/authDialog";
import Loading from "@/components/loading";
import config from "@/config";

const ResetPassword = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [statusText, setStatusText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setOpen(false);
    if (statusText === "OK") {
      router.push("/auth/login");
    }
  };

  const onSubmit = (data: any): void => {
    setIsLoading(true);
    axios
      .post(
        `${config.SERVER_DOMAIN}/auth/reset-password/${router.query.id}`,
        data
      )
      .then((res) => {
        setStatusText(res.statusText);
        setOpen(true);
        setMessage(res.data?.message);
        setIsLoading(false);
      })
      .catch((err) => {
        setOpen(true);
        setIsLoading(false);
        setMessage(err.response?.data.message);
      });
  };

  return (
    <>
      {isLoading && <Loading />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid
            sx={{
              display: { xs: "none", md: "flex" },
              background:
                "linear-gradient(20deg,#2f3136 0.89%,rgba(47, 49, 54, 0) 103.49%)",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="auth-container"
            item
            md={6}
          >
            <img
              style={{ width: "70%", height: "auto", objectFit: "cover" }}
              src="/auth-img/reset.png"
              alt="reset-img"
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
                xs: `url('/auth-img/reset.png')`,
                md: "none",
              },
              backgroundSize: "670px",
              backgroundRepeat: "no-repeat",
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
              <Typography textAlign="center" variant="h5">
                Reset Password
              </Typography>
              <Stack
                sx={{ width: { xs: "270px", sm: "380px" } }}
                mt={4}
                spacing={3}
              >
                <Controller
                  name="newPassword"
                  control={control}
                  rules={{ required: "NewPassword is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      name="newPassword"
                      type={showPassword1 ? "text" : "password"}
                      label="Enter your new password"
                      value={field.value || ""}
                      error={!!errors.newPassword}
                      helperText={errors.newPassword?.message as string}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword1(!showPassword1)}
                              edge="end"
                            >
                              {showPassword1 ? (
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
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{ required: "ConfirmPassword is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      name="confirmPassword"
                      type={showPassword2 ? "text" : "password"}
                      label="Enter your confirm password"
                      value={field.value || ""}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message as string}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword2(!showPassword2)}
                              edge="end"
                            >
                              {showPassword2 ? (
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
              <AuthButton>Change Password</AuthButton>
              <AuthDialog
                statusText={statusText}
                open={open}
                close={handleClose}
              >
                {message}
              </AuthDialog>
            </Card>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ResetPassword;
