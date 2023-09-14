/* eslint-disable @next/next/no-img-element */
import AuthButton from "@/components/authBtn";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";

const ResetPassword = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <>
      <Box>
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
              className="auth-img"
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
            sx={{ background: "#efeee3" }}
            md={6}
            xs={12}
          >
            <Box>
              <Typography textAlign="center" variant="h5">
                Reset Password
              </Typography>
              <Stack
                sx={{ width: { xs: "290px", sm: "400px" } }}
                mt={4}
                spacing={3}
              >
                <TextField
                  name="newPassword"
                  type={showPassword1 ? "text" : "password"}
                  label="Enter your new password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword1(!showPassword1)}
                          edge="end"
                        >
                          {showPassword1 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                <TextField
                  name="confirmPassword"
                  type={showPassword2 ? "text" : "password"}
                  label="Enter your confirm password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword2(!showPassword2)}
                          edge="end"
                        >
                          {showPassword2 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Stack>
              <AuthButton btnText={"Change Password"} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ResetPassword;
