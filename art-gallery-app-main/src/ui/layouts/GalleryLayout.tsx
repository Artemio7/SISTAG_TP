import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router';

import { mainMenu } from '../../config/menu/main-menu';
import { useAppSelector } from '../../store/reduxHooks';
import { NavBar, SideBar } from '../../ui';

const drawerWidth = 240;

export const GalleryLayout = () => {
  const { fullName } = useAppSelector((state) => state.auth);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <NavBar drawerWidth={drawerWidth} />
        <SideBar title={fullName!} drawerWidth={drawerWidth} items={mainMenu} />

        <Box
          className="animate__animated animate__fadeIn animate__faster"
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
