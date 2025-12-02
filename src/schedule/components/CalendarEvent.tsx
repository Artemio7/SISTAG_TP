import type { ScheduleEvent } from '../types';
import { useAppSelector } from '../../store/reduxHooks';

interface Props {
  event: ScheduleEvent;
}

export const CalendarEvent = ({ event }: Props) => {
  const { title } = event;
  const { fullName } = useAppSelector((state) => state.auth);

  return (
    <>
      <strong>{title}</strong>
      <strong> - {fullName}</strong>
    </>
  );
};
