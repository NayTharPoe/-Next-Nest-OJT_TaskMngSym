import palette from "@/theme/palette";
import { Button, styled } from "@mui/material";
import React from "react";

const CardBtn = (props: any) => {
  const colorCode =
    props.text === "Edit" ? palette.secondary.main : palette.primary.main;
  const hoverCode = props.text === "Edit" ? "#a8c8a8" : "#bca4e6";

  const CardButton = styled(Button)({
    boxShadow: "none",
    width: "100%",
    textTransform: "none",
    fontSize: 14,
    padding: "7px 30px",
    border: "1px solid",
    borderRadius: "20px",
    backgroundColor: colorCode,
    color: palette.text.primary,
    borderColor: colorCode,
    "&:hover": {
      backgroundColor: hoverCode,
      borderColor: hoverCode,
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: hoverCode,
      borderColor: hoverCode,
    },
  });

  return (
    <CardButton {...props} variant="contained">
      {props.children}
    </CardButton>
  );
};

export default CardBtn;
