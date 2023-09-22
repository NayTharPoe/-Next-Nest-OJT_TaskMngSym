/* eslint-disable @next/next/no-img-element */
import AuthButton from "@/components/authBtn";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
import React, { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box>
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
              <TextField
                name="email"
                type="email"
                style={{ borderRadius: "25px" }}
                label="Enter your email"
                fullWidth
              ></TextField>
              <TextField
                name="password"
                type={showPassword ? "text" : "password"}
                label="Enter your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
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
            <AuthButton btnText={"LogIn"} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
