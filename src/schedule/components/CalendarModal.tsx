import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { addHours, differenceInSeconds } from 'date-fns';
import { es } from 'date-fns/locale';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

import type { ModalFormInputs } from '../types';
import { useAppDispatch, useAppSelector } from '../../store/reduxHooks';
import { closeDateModal, setSnackbarOpen } from '../../store/ui';
import { setActiveEvent, startSavingEvent } from '../../store/schedule';

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const { scheduleProjectId } = useParams();
  const { uid } = useAppSelector((state) => state.auth);
  const { isDateModalOpen } = useAppSelector((state) => state.ui);
  const { activeEvent } = useAppSelector((state) => state.schedule);
  const dispatch = useAppDispatch();

  const {
    watch,
    reset,
    formState: { isSubmitted },
    control,
    register,
    handleSubmit,
  } = useForm<ModalFormInputs>({
    defaultValues: {
      ...activeEvent,
      start: activeEvent?.id ? new Date(activeEvent.start) : new Date(),
      end: activeEvent?.id
        ? new Date(activeEvent.end)
        : addHours(new Date(), 2),
    },
  });

  useEffect(() => {
    if (activeEvent) {
      reset({
        title: activeEvent.title,
        notes: activeEvent.notes,
        start: new Date(activeEvent.start),
        end: new Date(activeEvent.end),
      });
    }
  }, [activeEvent, reset]);

  const { title, start } = watch();

  const isTitleValid = useMemo(() => {
    if (!isSubmitted) return '';

    return title.length > 0 ? '' : 'is-invalid';
  }, [title, isSubmitted]);

  const onCloseModal = () => {
    dispatch(closeDateModal());
    dispatch(setActiveEvent(null));
  };

  const onStartSavingEvent = async ({
    start,
    end,
    title,
    notes,
  }: ModalFormInputs) => {
    const difference = differenceInSeconds(end, start);
    if (isNaN(difference) || difference <= 0) {
      dispatch(setSnackbarOpen(true));
      return;
    }

    if (title.length <= 0) return;

    const newStart = start.toISOString();
    const newEnd = end.toISOString();

    await dispatch(
      startSavingEvent({
        id: activeEvent?.id,
        title,
        notes,
        start: newStart,
        end: newEnd,
        userId: uid!,
        projectId: scheduleProjectId!,
      })
    );

    dispatch(closeDateModal());
  };

  return (
    <Modal
      className="modal"
      overlayClassName="modal-fondo"
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit(onStartSavingEvent)}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <Controller
            name="start"
            control={control}
            render={({ field }) => (
              <DatePicker
                name="start"
                selected={field.value}
                className="form-control"
                wrapperClassName="w-100"
                dateFormat="Pp"
                showTimeSelect
                locale="es"
                timeCaption="Hora"
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <Controller
            name="end"
            control={control}
            render={({ field }) => (
              <DatePicker
                name="end"
                minDate={start}
                selected={field.value}
                className="form-control"
                wrapperClassName="w-100"
                dateFormat="Pp"
                showTimeSelect
                locale="es"
                timeCaption="Hora"
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${isTitleValid}`}
            placeholder="Título del evento"
            autoComplete="off"
            {...register('title')}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            {...register('notes')}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <Button type="submit" startIcon={<SaveIcon />} variant="contained">
          Guardar
        </Button>
      </form>
    </Modal>
  );
};
