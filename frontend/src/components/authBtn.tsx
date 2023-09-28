import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const AuthButton = (props: any) => {
  const BootstrapButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    width: "100%",
    fontSize: 15,
    padding: "12px 12px",
    border: "1px solid",
    borderRadius: "8px",
    marginTop: "30px",
    backgroundColor: "#5a5a64",
    borderColor: "#5a5a64",
    "&:hover": {
      backgroundColor: "#2F3136",
      borderColor: "#2F3136",
      boxShadow: "none",
    },
    "&:active": {
      backgroundColor: "#2F3136",
      borderColor: "#2F3136",
      boxShadow: "none",
    },
  });

  return (
    <BootstrapButton type="submit" variant="contained" disableFocusRipple>
      {props.children}
    </BootstrapButton>
  );
};

export default AuthButton;
