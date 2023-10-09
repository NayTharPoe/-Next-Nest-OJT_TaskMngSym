import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { yupResolver } from '@hookform/resolvers/yup';
import MainLayout from '@/layouts/MainLayout';
import { ReactElement } from 'react';
import { Grid, TextField, Button, Paper, FormLabel, Stack } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import palette from '@/theme/palette';
import { DatePicker } from '@mui/x-date-pickers';
import { useRouter } from 'next/navigation';
import { ProjectSchema } from '@/lib/validation/projectSchema';
import dayjs from 'dayjs';
import axios from 'axios';
import config from '@/config';

const UpdateFormButton = (props: any) => {
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

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

const EditProjectPage: NextPageWithLayout = ({ project }: any) => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProjectSchema),
    defaultValues: {
      projectName: project?.data?.projectName || '',
      language: project?.data?.language || '',
      description: project?.data?.description || '',
      startDate: project?.data?.startDate && dayjs(project.data.startDate),
      endDate: project?.data?.endDate && dayjs(project.data.endDate),
    },
  });

  const onSubmit = async (payload: any) => {
    try {
      const res = await axios.patch(`${config.SERVER_DOMAIN}/project/edit/${project?.data._id}`, {
        ...payload,
        starDate: dayjs(payload.starDate).format('YYYY-MM-DD'),
        endDate: dayjs(payload.endDate).format('YYYY-MM-DD'),
      });
      router.push('/project/list');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: '760px',
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
                    value={field.value}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'outlined',
                        error: !!errors.startDate,
                        helperText: errors.startDate?.message,
                      },
                    }}
                    onChange={(value) => {
                      field.onChange(value);
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
                    value={field.value}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'outlined',
                        error: !!errors.endDate,
                        helperText: errors.endDate?.message,
                      },
                    }}
                    onChange={(value) => {
                      field.onChange(value);
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
            <UpdateFormButton>Update</UpdateFormButton>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

EditProjectPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default EditProjectPage;

export async function getServerSideProps(context: { query: { id: any } }) {
  const { id } = context.query;
  const res = await fetch(`${config.SERVER_DOMAIN}/project/detail/${id}`);
  const project = await res.json();

  return {
    props: {
      project,
    },
  };
}
