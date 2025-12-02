import { Link as RouterLink } from 'react-router';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { Project } from '../../projects/types/project';
import { useAppDispatch, useAppSelector } from '../../store/reduxHooks';
import ListItemText from '@mui/material/ListItemText';
import { setActiveProject } from '../../store/projects';

export const ScheduleProjectsView = () => {
  const { projects } = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();

  const handleClick = (project: Project) => {
    dispatch(setActiveProject(project));
  };

  return (
    <Stack>
      <Typography sx={{ fontSize: 39 }}>
        Administra las actividades de tus proyectos
      </Typography>

      <List>
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/schedule/${project.id}`}
            component={RouterLink}
            onClick={() => handleClick(project)}
          >
            <ListItemButton disableRipple divider>
              <ListItemText primary={project.title} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Stack>
  );
};
