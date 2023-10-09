import MainLayout from '@/layouts/MainLayout';
import { Box, Card, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import React, { ReactElement, useState } from 'react';
import AuthButton from '@/components/authBtn';
import axios from 'axios';
import AuthDialog from '@/components/authDialog';
import Loading from '@/components/loading';
import config from '@/config';
import { useRouter } from 'next/router';

const ChangePassword = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [statusText, setStatusText] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setOpen(false);
    if (statusText == 200) {
      router.push('/');
    }
  };

  const onSubmit = (data: any): void => {
    setIsLoading(true);
    axios
      .post(`${config.SERVER_DOMAIN}/auth/change-password`, data)
      .then((res) => {
        setStatusText(res.status);
        setOpen(true);
        setMessage(res.data?.message);
        setIsLoading(false);
      })
      .catch((err) => {
        setOpen(true);
        setIsLoading(false);
        setMessage(err.response?.data.message);
      });
  };

  return (
    <>
      {isLoading && <Loading />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: 'flex',
            height: '70vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card
            sx={{
              background: '#fff',
              width: { xs: '270px', sm: '480px' },
              opacity: '95%',
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
              padding: '20px',
            }}
          >
            <Typography textAlign="center" variant="h5">
              Change Password
            </Typography>
            <Stack mt={4} spacing={3}>
              <Controller
                name="email"
                control={control}
                rules={{ required: 'email is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    name="email"
                    type="email"
                    label="Enter your email"
                    value={field.value || ''}
                    error={!!errors.email}
                    helperText={errors.email?.message as string}
                  ></TextField>
                )}
              />
              <Controller
                name="oldPassword"
                control={control}
                rules={{ required: 'oldPassword is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    name="oldPassword"
                    type={showPassword1 ? 'text' : 'password'}
                    label="Enter your old password"
                    value={field.value || ''}
                    error={!!errors.oldPassword}
                    helperText={errors.oldPassword?.message as string}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword1(!showPassword1)} edge="end">
                            {showPassword1 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  ></TextField>
                )}
              />
              <Controller
                name="newPassword"
                control={control}
                rules={{ required: 'NewPassword is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    name="newPassword"
                    type={showPassword2 ? 'text' : 'password'}
                    label="Enter your new password"
                    value={field.value || ''}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message as string}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword2(!showPassword2)} edge="end">
                            {showPassword1 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  ></TextField>
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: 'confirmPassword is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    name="confirmPassword"
                    type={showPassword3 ? 'text' : 'password'}
                    label="Enter your confirm password"
                    value={field.value || ''}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message as string}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword3(!showPassword3)} edge="end">
                            {showPassword1 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  ></TextField>
                )}
              />
            </Stack>
            <AuthButton>Change Password</AuthButton>
            <AuthDialog statusText={statusText} open={open} close={handleClose}>
              {message}
            </AuthDialog>
          </Card>
        </Box>
      </form>
    </>
  );
};

ChangePassword.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ChangePassword;
