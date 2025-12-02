import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Fab from '@mui/material/Fab';

import { useAppDispatch, useAppSelector } from '../../store/reduxHooks';
import { startDeletingEvent } from '../../store/schedule';

export const FabDeleteEvent = () => {
  const dispatch = useAppDispatch();
  const { activeEvent } = useAppSelector((state) => state.schedule);
  const hasEventSelected = !!activeEvent && activeEvent.id;

  const handleDelete = () => {
    dispatch(startDeletingEvent());
  };

  return (
    <Fab
      color="primary"
      sx={{ display: hasEventSelected ? '' : 'none' }}
      onClick={handleDelete}
    >
      <DeleteRoundedIcon />
    </Fab>
  );
};
