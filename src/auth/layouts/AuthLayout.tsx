import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid
        className="box-shadow"
        sx={{
          width: { sm: 450 },
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Outlet />
      </Grid>
    </Grid>
  );
};
