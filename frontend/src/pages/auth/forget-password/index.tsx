/* eslint-disable @next/next/no-img-element */
import AuthButton from "@/components/authBtn";
import { Box, Card, Grid, Stack, TextField, Typography } from "@mui/material";
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
              style={{ width: "65%", height: "auto", objectFit: "cover" }}
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
            sx={{
              backgroundImage: {
                xs: `url('/auth-img/forget.png')`,
                md: "none",
              },
              backgroundSize: "450px",
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
                Forget Password
              </Typography>
              <Stack
                sx={{ width: { xs: "270px", sm: "380px" } }}
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
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ForgetPasswrod;
