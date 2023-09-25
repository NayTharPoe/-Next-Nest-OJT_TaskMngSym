/* eslint-disable @next/next/no-img-element */
import AuthButton from "@/components/authBtn";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any): void => {
    axios.post("http://localhost:8080/auth/login", data).then((res) => {
      setOpen(true);
      router.push("/");
    });
  };

  return (
    <Box>
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
              backgroundImage: { xs: `url('/auth-img/login.png')`, md: "none" },
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
              <Typography textAlign="center" variant="h5">
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
            </Card>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Login;
