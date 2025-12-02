import { NavLink } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import Toolbar from '@mui/material/Toolbar';

import { useAppDispatch } from '../../store/reduxHooks';
import { startLogout } from '../../store/auth';
import { setActiveProject } from '../../store/projects';

interface Props {
  drawerWidth?: number;
}

export const NavBar = ({ drawerWidth }: Props) => {
  const dispatch = useAppDispatch();

  const handleActiveProject = () => {
    dispatch(setActiveProject(null));
  };

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <AppBar
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link
          component={NavLink}
          to="/projects"
          onClick={handleActiveProject}
          variant="h6"
          sx={{ color: 'white' }}
        >
          Art Gallery
        </Link>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="error" onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
