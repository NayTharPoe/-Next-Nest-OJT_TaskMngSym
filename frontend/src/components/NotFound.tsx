import { Box, Container, Grid, Typography, Button } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';

const NotFoundPage = () => {
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
        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: '5em' }}>404</Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="outlined" onClick={() => router.push('/')}>
              Back Home
            </Button>
          </Grid>
          <Grid item xs={6}>
            <img
              src="https://img.freepik.com/free-vector/400-error-bad-request-concept-illustration_114360-1921.jpg?w=1060&t=st=1696561142~exp=1696561742~hmac=c089bc3fe77257583eef07f1ce19e2034ed83dbd6b223075f1d95885ed10e3bc"
              alt=""
              width={650}
              height="auto"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
