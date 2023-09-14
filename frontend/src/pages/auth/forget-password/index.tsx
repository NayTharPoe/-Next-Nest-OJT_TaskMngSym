/* eslint-disable @next/next/no-img-element */
import AuthButton from "@/components/authBtn";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const ForgetPasswrod = () => {
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
              className="auth-img forget-img"
              src="/auth-img/forget.png"
              alt="forget-img"
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
                Forget Password
              </Typography>
              <Stack
                sx={{ width: { xs: "290px", sm: "400px" } }}
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
              </Stack>
              <AuthButton btnText={"Reset your password"} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ForgetPasswrod;
