import React, { ReactElement } from 'react';
import MainLayout from '@/layouts/MainLayout';
import type { NextPageWithLayout } from './_app';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import palette from '@/theme/palette';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import SummarizeIcon from '@mui/icons-material/Summarize';

const DashboardPage: NextPageWithLayout = () => {
  return (
    <Grid container spacing={3} sx={{ mt: 2, justifyContent: 'center' }}>
      <Grid item xs={12} md={2.8}>
        <Card sx={{ borderRadius: '1.2rem', backgroundColor: palette.common.white, boxShadow: 'none' }}>
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              py: 4,
            }}
          >
            <Box
              sx={{
                borderRadius: '50%',
                backgroundColor: palette.primary.main,
                width: '50px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <GroupIcon sx={{ fontSize: '2rem', color: palette.common.white }} />
            </Box>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="h1" sx={{ fontWeight: '600' }}>
                124
              </Typography>
              <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary" gutterBottom>
                Total Employees
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={2.8}>
        <Card sx={{ borderRadius: '1.2rem', backgroundColor: palette.common.white, boxShadow: 'none' }}>
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              py: 4,
            }}
          >
            <Box
              sx={{
                borderRadius: '50%',
                backgroundColor: '#78b3ea',
                width: '50px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <BarChartIcon sx={{ fontSize: '2rem', color: palette.common.white }} />
            </Box>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="h1" sx={{ fontWeight: '600' }}>
                50
              </Typography>
              <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary" gutterBottom>
                Total Projects
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={2.8}>
        <Card sx={{ borderRadius: '1.2rem', backgroundColor: palette.common.white, boxShadow: 'none' }}>
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              py: 4,
            }}
          >
            <Box
              sx={{
                borderRadius: '50%',
                backgroundColor: '#909eab',
                width: '50px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MiscellaneousServicesIcon sx={{ fontSize: '2rem', color: palette.common.white }} />
            </Box>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="h1" sx={{ fontWeight: '600' }}>
                87
              </Typography>
              <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary" gutterBottom>
                Total Tasks
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={2.8}>
        <Card sx={{ borderRadius: '1.2rem', backgroundColor: palette.common.white, boxShadow: 'none' }}>
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              py: 4,
            }}
          >
            <Box
              sx={{
                borderRadius: '50%',
                backgroundColor: '#89c6bd',
                width: '50px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <SummarizeIcon sx={{ fontSize: '2rem', color: palette.common.white }} />
            </Box>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="h1" sx={{ fontWeight: '600' }}>
                124
              </Typography>
              <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary" gutterBottom>
                Total Reports
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default DashboardPage;
