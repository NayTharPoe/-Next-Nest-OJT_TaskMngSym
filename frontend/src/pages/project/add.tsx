import React from 'react'
import MainLayout from '@/layouts/MainLayout'
import { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';
import { Grid, TextField, Button, Paper, Box, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useForm, Controller } from 'react-hook-form';
import palette from '@/theme/palette';

type FormValues = {
  projectName: string;
  language: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
};

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
    variant='outlined'
    sx={{
      padding: '10px',
      borderRadius: '.5rem',
      border: `1px solid ${palette.primary.main}`,
    }}
    {...props}
  >
    {props.children}
  </Button>
  )
}

const AddNewProjectPage: NextPageWithLayout = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      projectName: '',
      language: '',
      description: '',
      startDate: null,
      endDate: null,
    },
  });

  const { register, handleSubmit, formState, control, setValue, setError, clearErrors } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    if (!data.startDate) {
      setError('startDate', { type: 'manual', message: 'Start Date is required' });
    } else {
      clearErrors('startDate');
    }

    if (!data.endDate) {
      setError('endDate', { type: 'manual', message: 'End Date is required' });
    } else {
      clearErrors('endDate');
    }

    if (Object.keys(errors).length === 0) {
      console.log(data);
    }
  };

  return (
    <Paper elevation={0} sx={{maxWidth: '760px',m: '0 auto',mt: 10,p: 5, background: palette.common.white, borderRadius: '1.1rem'}}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Stack spacing={1}>
            <label htmlFor="projectName">Project Name</label>
            <TextField
              id='projectName'
              {...register('projectName', { required: 'Project Name is required' })}
              error={!!errors.projectName}
              helperText={errors.projectName?.message}
              sx={{
                '.MuiInputBase-root': {
                  borderRadius: '.7rem',
                },
                '.MuiInputBase-input': {
                  p: '11.5px 14px'
                }
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1}>
          <label htmlFor="language">Language</label>
          <TextField
            id='language'
            {...register('language', { required: 'Language is required' })}
            error={!!errors.language}
            helperText={errors.language?.message}
            sx={{
              '.MuiInputBase-root': {
                borderRadius: '.7rem',
              },
              '.MuiInputBase-input': {
                p: '11.5px 14px'
              }
            }}
          />
          </Stack>
        </Grid>
        <Grid item xs={12}>
        <Stack spacing={1}>
        <label htmlFor="description">Description</label>
          <TextField id='description' {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
            sx={{
              '.MuiInputBase-root': {
                borderRadius: '.7rem',
              },
              '.MuiInputBase-input': {
                p: '11.5px 14px'
              }
            }}
          />
        </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
          <label>Start Date Date</label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  value={field.value}
                  onChange={(newValue) =>
                    field.onChange(newValue)
                  }
                  sx={{
                    '.MuiInputBase-root': {
                      borderRadius: '.7rem',
                    },
                    '.MuiInputBase-input': {
                      p: '11.5px 14px'
                    }
                  }}
                />
                {errors.startDate && (
                  <span style={{ color: 'red' }}>{errors.startDate.message}</span>
                )}
              </>
            )}
          />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
          <label>End Date</label>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  value={field.value}
                  onChange={(newValue) =>
                    field.onChange(newValue)
                  }
                  sx={{
                    'MuiDateCalendar-root': {
                      boxShadow: 'none'
                    },
                    '.MuiInputBase-root': {
                      borderRadius: '.7rem',
                    },
                    '.MuiInputBase-input': {
                      p: '11.5px 14px'
                    }
                  }}
                />
                {errors.endDate && (
                  <span style={{ color: 'red' }}>{errors.endDate.message}</span>
                )}
              </>
            )}
          />
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{mt: 1}}>
          <CancelFormButton>Cancel</CancelFormButton>
        </Grid>
        <Grid item xs={6} sx={{mt: 1}}>
          <CreateFormButton
          >Create</CreateFormButton>
        </Grid>
      </Grid>
      </form>
    </Paper>
  )
}

AddNewProjectPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
export default AddNewProjectPage
