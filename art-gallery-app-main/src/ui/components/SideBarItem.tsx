import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import type { CustomItem } from '../../types/custom-item';
import { cropString } from '../../helpers';

export const SideBarItem = ({ title, subtitle, icon, path }: CustomItem) => {
  const newTitle = useMemo(() => {
    return cropString(title, 15);
  }, [title]);

  const newSubtitle = useMemo(() => {
    if (!subtitle) return;
    return cropString(subtitle, 35);
  }, [subtitle]);

  const { pathname } = useLocation();
  const isActive = pathname.includes(path);

  return (
    <Link component={NavLink} to={path}>
      <ListItem
        divider
        className="animate__animated animate__fadeIn"
        disablePadding
      >
        <ListItemButton selected={isActive}>
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: 'secondary.main' }}>{icon}</Avatar>
          </ListItemAvatar>

          <Grid>
            <ListItemText primary={newTitle} />
            <ListItemText secondary={newSubtitle} />
          </Grid>
        </ListItemButton>
      </ListItem>
    </Link>
  );
};
