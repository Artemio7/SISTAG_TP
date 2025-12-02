import { addHours } from 'date-fns';
import AddOutlined from '@mui/icons-material/AddOutlined';
import Fab from '@mui/material/Fab';
import { useAppDispatch, useAppSelector } from '../../store/reduxHooks';
import { setActiveEvent } from '../../store/schedule';
import { openDateModal } from '../../store/ui';

export const FabAddNewEvent = () => {
  const { uid: userId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleClickNew = () => {
    dispatch(
      setActiveEvent({
        title: '',
        notes: '',
        start: new Date().toISOString(),
        end: addHours(new Date(), 2).toISOString(),
        bgColor: '#fafafa',
        userId: userId!,
      })
    );

    dispatch(openDateModal());
  };

  return (
    <Fab color="error" onClick={handleClickNew}>
      <AddOutlined sx={{ fontSize: 30 }} />
    </Fab>
  );
};
