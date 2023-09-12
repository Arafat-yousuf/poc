import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/material';
import { useSnackbarStore } from '../../stores/snackbar.store';

export default function SnackbarComponent() {
  const { open, message, snackbarType, closeSnackbar } = useSnackbarStore((state) => ({
    open: state.open,
    message: state.message,
    snackbarType: state.snackbarType,
    closeSnackbar: state.closeSnackbar,
  }));

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  };

  return (
    <Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert elevation={6} variant='filled' onClose={handleClose} color={snackbarType}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
