import { Link as RouterLink } from 'react-router';
import AddOutlined from '@mui/icons-material/AddOutlined';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { Project } from '../types/project';
import { useAppDispatch, useAppSelector } from '../../store/reduxHooks';
import { setActiveProject, startNewProject } from '../../store/projects';
import { ProjectItem } from '../components/ProjectItem';

// TODO: use navigation with router if posible
export const ProjectsView = () => {
  const { projects } = useAppSelector((state) => state.projects);
  const { isSaving } = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();

  // TODO: fix the error when change of view if posible
  const onClickNewProject = () => {
    dispatch(startNewProject());
  };

  const handleLinkClick = (project: Project) => {
    dispatch(setActiveProject(project));
  };

  return (
    <>
      <Stack>
        <Typography sx={{ fontSize: 39 }}>
          Crea o modifica tus proyectos
        </Typography>

        <List>
          {projects.map((project) => (
            <Link
              key={project.id}
              component={RouterLink}
              to={`/projects/${project.id}`}
              onClick={() => handleLinkClick(project)}
            >
              <ProjectItem
                title={project.title || ''}
                subtitle={project.description}
                images={project.imagesUrls}
              />
            </Link>
          ))}
        </List>
      </Stack>

      <Fab
        disabled={isSaving}
        color="error"
        sx={{ position: 'fixed', right: 50, bottom: 50 }}
        onClick={onClickNewProject}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </Fab>
    </>
  );
};
