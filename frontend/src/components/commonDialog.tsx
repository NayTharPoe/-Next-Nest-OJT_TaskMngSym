// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Slide from '@mui/material/Slide';
// import { TransitionProps } from '@mui/material/transitions';

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement<any, any>;
//   },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// export default function ConfirmDialog({open, onClose} : any) {

//   return (
//     <div>
//       <Dialog
//         open={open}
//         TransitionComponent={Transition}
//         onClose={onClose}
//         aria-labelledby="responsive-dialog-title"
//       >
//         <DialogTitle id="responsive-dialog-title">
//           {"Confirmation?"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to proceed with this action.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={onClose} autoFocus>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import palette from "@/theme/palette";
import axios from "axios";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog(props: any) {
  const { open, id, onClose, onClick, onCancel } = props;
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        // onClose={onClose}
        aria-labelledby="responsive-dialog-title"
        BackdropProps={{
          sx: { backgroundColor: "rgba(0, 0, 0, 0.2)" }, // Set the backdrop color with transparency
        }}
        sx={{
          ".MuiPaper-root": {
            borderRadius: "10px",
            boxShadow: "none",
          },
        }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          variant="h4"
          sx={{ backgroundColor: palette.primary.main, fontWeight: 500 }}
        >
          Confirmation?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ pt: 3 }} variant="h5">
            Are you sure you want to proceed with this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 3 }}>
          <Button
            onClick={onCancel}
            autoFocus
            sx={{ color: palette.primary.dark, fontSize: "0.95rem" }}
          >
            Cancel
          </Button>
          <Button
            onClick={onClick}
            autoFocus
            sx={{ color: palette.primary.dark, fontSize: "0.95rem" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
