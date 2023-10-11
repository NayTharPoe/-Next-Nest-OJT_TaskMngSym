/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import AuthDialog from "@/components/authDialog";
import config from "@/config";

const VerifyAccount = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [statusText, setStatusText] = useState(0);

  const router = useRouter();

  const accountVerify = () => {
    axios
      .post(`${config.SERVER_DOMAIN}/auth/verify/${router.query.token}`)
      .then((res) => {
        console.log(res);
        setOpen(true);
        setStatusText(res.status);
        setMessage(res.data?.message);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          setOpen(true);
          setMessage(err.message);
        } else {
          setOpen(true);
          setMessage(err.response?.data.message);
        }
      });
  };

  const handleClose = () => {
    setOpen(false);
    if (statusText === 200) {
      router.push("/auth/login");
    }
  };

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
            style={{ width: "320px" }}
            src="/auth-img/verify.png"
            alt="verify-img"
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography my={3} px={3} variant="h6">
            Please click the following button to verify your account!
          </Typography>
          <Button
            onClick={accountVerify}
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
          <AuthDialog statusText={statusText} open={open} close={handleClose}>
            {message}
          </AuthDialog>
        </Box>
      </Box>
    </>
  );
};

export default VerifyAccount;
