import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog({open, onClose} : any) {
  

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirmation?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to proceed with this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}