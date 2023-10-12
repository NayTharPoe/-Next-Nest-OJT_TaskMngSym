import { Box, Container, Grid, Typography, Button } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';

const UnAuthorizedPage = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid item xs={12} md={6} lg={6} sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: '5em' }}>401</Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              You're not authorized to access this page.
            </Typography>
            <Button variant="outlined" onClick={() => router.push('/')}>
              Back Home
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <img
              src="https://img.freepik.com/free-vector/401-error-unauthorized-concept-illustration_114360-1883.jpg?w=740&t=st=1697095206~exp=1697095806~hmac=3be7b14c0ec5039729b8537d32a53aa7f202d2b482d83e048741407499caa23b"
              alt=""
              width={400}
              height="auto"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UnAuthorizedPage;
