import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AuthDialog(props: any) {
  const { open, close, statusText } = props;
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          align="center"
          sx={{
            fontSize: "16px",
            color: statusText === "OK" ? "#ffffff" : "red",
            display: "flex",
            background: statusText === "OK" ? "#73a973" : "pink",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <CancelIcon /> */}
          {statusText === "OK" ? "Success" : "Error"}
        </DialogTitle>
        <DialogContent sx={{ margin: "20px 40px" }}>
          <DialogContentText id="alert-dialog-slide-description">
            {props.children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={close}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
