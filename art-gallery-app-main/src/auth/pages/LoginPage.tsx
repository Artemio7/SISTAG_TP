import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import type { LoginFormInputs } from '../types';
import { authErrors } from '../errors/auth-errors';

import { useAppDispatch, useAppSelector } from '../../store/reduxHooks';
import { startLoginWithEmailAndPassword } from '../../store/auth';

import { PasswordField } from '../../ui/components/PasswordField';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { status, errorMessage } = useAppSelector((state) => state.auth);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<LoginFormInputs>();

  const handleLogin = (data: LoginFormInputs) => {
    if (!isValid) return;

    dispatch(startLoginWithEmailAndPassword(data));
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Iniciar sesión
      </Typography>
      <form
        aria-label="submit-form"
        onSubmit={handleSubmit(handleLogin)}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container direction="column">
          <Grid sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@mail.com"
              autoComplete="email"
              fullWidth
              error={errors.email !== undefined}
              helperText={errors.email?.message}
              {...register('email', { required: authErrors.email.required })}
            />
          </Grid>

          <Grid sx={{ mt: 2 }}>
            <PasswordField
              label="Contraseña"
              placeholder="Digita tu contraseña"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password', {
                required: authErrors.password.required,
              })}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Grid size={12} display={!errorMessage === false ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid size={12}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                <Typography>Login</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
