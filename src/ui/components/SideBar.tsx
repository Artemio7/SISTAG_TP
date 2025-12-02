import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import type { CustomItem } from '../../types/custom-item';

import { SideBarItem } from './SideBarItem';

interface Props {
  title?: string;
  items?: CustomItem[];
  drawerWidth?: number;
}

export const SideBar = ({ title = '', items, drawerWidth = 250 }: Props) => {
  return (
    <Box sx={{ width: drawerWidth, flexShrink: 0 }}>
      <Drawer
        variant="permanent"
        open
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ width: '100%' }}>
            {title}
          </Typography>
        </Toolbar>

        <Divider />

        <List>
          {items?.map((item) => (
            <SideBarItem key={item.path} {...item} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
