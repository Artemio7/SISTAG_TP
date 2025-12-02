import { useState, type FocusEvent, type KeyboardEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import type { Project } from '../types/project';

import { useAppDispatch, useAppSelector } from '../../store/reduxHooks';
import { setActiveProject, startSavingProject } from '../../store/projects';

import { ImageGallery } from '../../ui';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { addMinutes, formatISO, isBefore } from 'date-fns';

export const ProjectView = () => {
  const dispatch = useAppDispatch();

  const { active: project, isSaving } = useAppSelector(
    (state) => state.projects
  );

  const { control, handleSubmit, register, getValues, setValue } =
    useForm<Project>({
      defaultValues: project!,
    });

  const currentTitle = getValues('title');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [minEndDate, setMinEndDate] = useState(
    addMinutes(project!.startDate, 30)
  );

  const handleEditingTitle = () => {
    setIsEditingTitle(true);
  };

  const handleBlur = ({ target }: FocusEvent<HTMLInputElement>) => {
    setIsEditingTitle(false);
    setValue('title', target.value.trim());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault();
      setIsEditingTitle(false);
    }
  };

  const onSaveProject = (project: Project) => {
    const mappedProject: Project = {
      ...project,
      startDate: formatISO(project.startDate),
      endDate: formatISO(project.endDate),
    };

    dispatch(setActiveProject(mappedProject));
    dispatch(startSavingProject());
  };

  return (
    <Container maxWidth={false}>
      <Stack
        className="animate__animated animate__fadeIn animate__faster"
        spacing={2}
      >
        {/* ProjectForm */}
        <form onSubmit={handleSubmit(onSaveProject)}>
          <Grid
            container
            justifyContent="space-between"
            mb={isEditingTitle ? 2 : undefined}
          >
            <Grid>
              {isEditingTitle ? (
                <TextField
                  autoFocus
                  defaultValue={project?.title}
                  slotProps={{
                    input: {
                      style: { fontSize: 20 },
                      onKeyDown: handleKeyDown,
                    },
                  }}
                  {...register('title', {
                    onBlur: handleBlur,
                  })}
                />
              ) : (
                <Typography
                  onClick={handleEditingTitle}
                  fontSize={39}
                  fontWeight="light"
                  sx={{ cursor: 'pointer' }}
                >
                  {currentTitle}
                </Typography>
              )}
            </Grid>

            <Grid>
              <Button
                type="submit"
                disabled={isSaving}
                color="primary"
                sx={{ padding: 2 }}
              >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
              </Button>
            </Grid>
          </Grid>

          <TextField
            defaultValue={project?.description}
            sx={{ mb: 2 }}
            fullWidth
            multiline
            placeholder="Ingrese detalles acerca del proyecto"
            minRows={5}
            {...register('description')}
          />

          <Grid container spacing={2}>
            <Grid size="grow">
              <Controller
                control={control}
                name="startDate"
                defaultValue={project?.startDate}
                rules={{
                  validate: (value) => !isBefore(value, project!.startDate),
                }}
                render={({ field, fieldState: { error } }) => (
                  <DateTimePicker
                    ampm
                    label="Fecha de inicio"
                    sx={{ minWidth: '100%' }}
                    slotProps={{
                      textField: {
                        error: !!error,
                        helperText: !!error && 'Fecha invalida',
                      },
                    }}
                    value={new Date(field.value)}
                    onChange={(value) => {
                      field.onChange(value);
                      setMinEndDate(addMinutes(value!.toString(), 30));
                    }}
                    minDateTime={new Date()}
                  />
                )}
              />
            </Grid>

            <Grid size="grow">
              <Controller
                control={control}
                name="endDate"
                defaultValue={project!.endDate}
                rules={{
                  validate: (value) => !isBefore(value, minEndDate),
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <DateTimePicker
                      ampm
                      slotProps={{
                        textField: {
                          error: !!error,
                          helperText: !!error && 'Fecha invalida',
                        },
                      }}
                      label="Fecha de fin"
                      value={new Date(field.value)}
                      sx={{ minWidth: '100%' }}
                      onChange={field.onChange}
                      minDateTime={minEndDate}
                    />
                  );
                }}
              />
            </Grid>
          </Grid>
        </form>

        {/* Image gallery */}
        <ImageGallery images={project?.imagesUrls} />
      </Stack>
    </Container>
  );
};
