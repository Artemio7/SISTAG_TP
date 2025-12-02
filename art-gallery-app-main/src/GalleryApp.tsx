import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { useAppDispatch, useAppSelector } from './store/reduxHooks';
import { setSnackbarOpen } from './store/ui';
import { AppTheme } from './theme';
import { AppRouter } from './router/AppRouter';

export const GalleryApp = () => {
  const { savedMessage } = useAppSelector((state) => state.projects);
  const { isSnackbarOpen } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setSnackbarOpen(false));
  };

  return (
    <AppTheme>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <AppRouter />
        <Snackbar
          open={isSnackbarOpen}
          onClose={handleClose}
          autoHideDuration={5000}
        >
          <Alert onClose={handleClose} severity="success" variant="filled">
            {savedMessage}
          </Alert>
        </Snackbar>
      </LocalizationProvider>
    </AppTheme>
  );
};
