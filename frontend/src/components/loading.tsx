import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "transparent",
  outline: "none",
};

const Loading = () => {
  return (
    <>
      <Modal open={true}>
        <Box sx={style}>
          <CircularProgress />
        </Box>
      </Modal>
    </>
  );
};

export default Loading;
