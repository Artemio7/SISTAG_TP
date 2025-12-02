import type { CustomItem } from '../../types/custom-item';
import BookIcon from '@mui/icons-material/Book';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PeopleIcon from '@mui/icons-material/People';
import Favorite from '@mui/icons-material/Favorite';

export const mainMenu: CustomItem[] = [
  {
    path: '/projects',
    title: 'Proyectos',
    icon: <BookIcon />,
  },
  {
    path: '/projects/health',
    title: 'Salud proyectos',
    icon: <Favorite />,
  },
  {
    path: '/schedule',
    title: 'Cronograma',
    icon: <ScheduleIcon />,
  },
  {
    path: '/distribution',
    title: 'Distribución',
    icon: <PeopleIcon />,
  },
];
