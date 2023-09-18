import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import palette from '@/theme/palette';

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
        sx={{
          ".MuiPaper-root": {
            borderRadius: '10px'
          }
        }}
      >
        <DialogTitle id="responsive-dialog-title" sx={{backgroundColor: palette.primary.main}}>
          <Typography variant='h4' sx={{fontWeight: '400'}}>Confirmation?</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{pt: 3}}>
            <Typography variant='h5'>Are you sure you want to proceed with this action.</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{pb: 3}}>
          <Button onClick={onClose} autoFocus sx={{color: palette.primary.dark, fontSize: '0.95rem'}}>
            Cancel
          </Button>
          <Button onClick={onClose} autoFocus sx={{color: palette.primary.dark, fontSize:'0.95rem'}}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}