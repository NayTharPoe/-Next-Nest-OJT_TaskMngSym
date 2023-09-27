import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
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
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog(props: any) {
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        onClose={props.onClose}
        aria-labelledby="responsive-dialog-title"
        BackdropProps={{
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.2)' }, // Set the backdrop color with transparency
        }}
        sx={{
          '.MuiPaper-root': {
            borderRadius: '10px',
            boxShadow: 'none',
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
          <Button onClick={props.onClose} autoFocus sx={{ color: palette.primary.dark, fontSize: '0.95rem' }}>
            Cancel
          </Button>
          <Button autoFocus sx={{ color: palette.primary.dark, fontSize: '0.95rem' }} {...props}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
