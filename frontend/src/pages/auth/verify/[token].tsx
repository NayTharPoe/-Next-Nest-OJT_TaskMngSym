/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";

const VerifyAccount = () => {
  return (
    <>
      <Box sx={{ background: "#efeeec", height: "100vh" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            className="verify-img"
            src="/auth-img/verify.png"
            alt="verify-img"
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography my={3} px={3} variant="h6">
            Please click the following button to verify your account!
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: "#5a5a64",
              textTransform: "none",
              fontSize: "18px",
              borderRadius: "8px",
              "&:hover": {
                background: "#4a4a54",
              },
            }}
          >
            Verify Account
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default VerifyAccount;
