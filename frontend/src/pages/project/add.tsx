import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import MainLayout from '@/layouts/MainLayout';
import { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';
import { Grid, TextField, Button, Paper, FormLabel, Stack } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import palette from '@/theme/palette';
import { DatePicker } from '@mui/x-date-pickers';
import { useRouter } from 'next/navigation';
import { ProjectSchema } from '@/lib/validation/projectSchema';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import config from '@/config';

const CreateFormButton = (props: any) => {
  return (
    <Button
      fullWidth
      type="submit"
      variant="contained"
      sx={{
        padding: '10px',
        borderRadius: '.5rem',
        boxShadow: 'none',
        backgroundColor: palette.primary.main,
        color: palette.text.primary,
        '&:hover': {
          backgroundColor: palette.primary.main,
          borderColor: palette.primary.border,
          boxShadow: 'none',
        },
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

const CancelFormButton = (props: any) => {
  return (
    <Button
      fullWidth
      variant="outlined"
      sx={{
        padding: '10px',
        borderRadius: '.5rem',
        border: `1px solid ${palette.primary.main}`,
        color: palette.primary.darker,
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

const AddNewProjectPage: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProjectSchema),
    defaultValues: {
      projectName: '',
      language: '',
      description: '',
      startDate: null || undefined,
      endDate: null || undefined,
    },
  });

  const onSubmit = async (payload: any) => {
    try {
      const res = await axios.post(`${config.SERVER_DOMAIN}/project/add`, {
        ...payload,
        starDate: dayjs(payload.starDate).format('YYYY-MM-DD'),
        endDate: dayjs(payload.endDate).format('YYYY-MM-DD'),
      });
      router.push('/project/list');
    } catch (error) {
      console.log(error);
    }
  };

  const isWeekend = (date: Dayjs) => {
    const day = date.day();
    return day === 0 || day === 6;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: '780px',
        m: '0 auto',
        mt: 10,
        p: 5,
        background: palette.common.white,
        borderRadius: '1.1rem',
      }}
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <FormLabel htmlFor="projectName" sx={{ color: palette.text.primary, fontSize: '15.5px' }}>
                Project Name <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Controller
                name="projectName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="projectName"
                    variant="outlined"
                    error={!!errors.projectName}
                    helperText={errors.projectName?.message}
                    sx={{
                      '.MuiInputBase-root': {
                        borderRadius: '.6rem',
                      },
                      '.MuiInputBase-input': {
                        p: '11.5px 14px',
                      },
                    }}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <FormLabel htmlFor="language" sx={{ color: palette.text.primary, fontSize: '15.5px' }}>
                Language <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="language"
                    variant="outlined"
                    error={!!errors.language}
                    helperText={errors.language?.message}
                    sx={{
                      '.MuiInputBase-root': {
                        borderRadius: '.6rem',
                      },
                      '.MuiInputBase-input': {
                        p: '11.5px 14px',
                      },
                    }}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <FormLabel htmlFor="description" sx={{ color: palette.text.primary, fontSize: '15.5px' }}>
                Description
              </FormLabel>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="description"
                    variant="outlined"
                    sx={{
                      '.MuiInputBase-root': {
                        borderRadius: '.6rem',
                      },
                      '.MuiInputBase-input': {
                        p: '11.5px 14px',
                      },
                    }}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <FormLabel htmlFor="startDate" sx={{ color: palette.text.primary, fontSize: '15.5px' }}>
                Start Date <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    shouldDisableDate={isWeekend}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'outlined',
                        error: !!errors.startDate,
                        helperText: errors.startDate?.message,
                      },
                    }}
                    onChange={(date) => {
                      field.onChange(date?.toDate());
                    }}
                    sx={{
                      'MuiDateCalendar-root': {
                        boxShadow: 'none',
                      },
                      '.MuiInputBase-root': {
                        borderRadius: '.6rem',
                      },
                      '.MuiInputBase-input': {
                        p: '11.5px 14px',
                      },
                    }}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <FormLabel htmlFor="endDate" sx={{ color: palette.text.primary, fontSize: '15.5px' }}>
                End Date <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    shouldDisableDate={isWeekend}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'outlined',
                        error: !!errors.endDate,
                        helperText: errors.endDate?.message,
                      },
                    }}
                    onChange={(date) => {
                      field.onChange(date?.toDate());
                    }}
                    sx={{
                      'MuiDateCalendar-root': {
                        boxShadow: 'none',
                      },
                      '.MuiInputBase-root': {
                        borderRadius: '.6rem',
                      },
                      '.MuiInputBase-input': {
                        p: '11.5px 14px',
                      },
                    }}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
            <CancelFormButton onClick={() => router.back()}>Cancel</CancelFormButton>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
            <CreateFormButton>Create</CreateFormButton>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

AddNewProjectPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AddNewProjectPage;
