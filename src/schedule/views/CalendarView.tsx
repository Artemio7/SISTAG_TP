import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import type { ScheduleEvent } from '../types';
import { dateEventToReduxEvent, reduxEventsToDateEvents } from '../mappers';
import { getMessagesES, localizer } from '../../helpers';
import { setActiveEvent, startLoadingEvents } from '../../store/schedule';
import { openDateModal } from '../../store/ui';
import { useCalendar } from '../hooks';
import { CalendarEvent, CalendarModal, EventOptions } from '../components';

export const CalendarView = () => {
  const {
    date,
    events,
    lastView,
    user,

    dispatch,
    onNavigate,
    onViewChanged,
  } = useCalendar();

  const { scheduleProjectId } = useParams();

  const scheduleEvents = useMemo(
    () => reduxEventsToDateEvents(events),
    [events]
  );

  const eventStyleGetter = (event: ScheduleEvent) => {
    const isMyEvent = user.uid === event.userId;

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style,
    };
  };

  const onDoubleClick = () => {
    dispatch(openDateModal());
  };

  const onSelect = (event: ScheduleEvent) => {
    const reduxEvent = dateEventToReduxEvent(event);
    dispatch(setActiveEvent(reduxEvent));
  };

  const onCalendarClick = () => {
    dispatch(setActiveEvent(null));
  };

  useEffect(() => {
    dispatch(startLoadingEvents(scheduleProjectId!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleProjectId]);

  return (
    <>
      <Calendar
        selectable
        onSelectSlot={onCalendarClick}
        culture="es"
        localizer={localizer}
        events={scheduleEvents}
        date={date}
        view={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        onNavigate={onNavigate}
      />

      <CalendarModal />
      <EventOptions />
    </>
  );
};
