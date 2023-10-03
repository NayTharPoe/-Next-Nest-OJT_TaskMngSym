import React, { ReactElement, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import type { NextPageWithLayout } from './_app';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import palette from '@/theme/palette';
import ProjectIcon from '@/components/icons/ProjectIcon';
import ReportIcon from '@/components/icons/ReportIcon';
import EmployeeIcon from '@/components/icons/EmployeeIcon';
import TaskIcon from '@/components/icons/TaskIcon';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

// const generateChartData = (headCells: any[]) => {
//   const labels = headCells.map((cell) => cell.label);
//   const data = headCells.map((cell) => /* Replace this with your data values */);

//   return {
//     labels,
//     datasets: [
//       {
//         label: 'Data Values',
//         data,
//         backgroundColor: 'rgba(75, 192, 192, 0.6)', // You can customize the colors
//       },
//     ],
//   };
// };

const DashboardPage: NextPageWithLayout = ({ dataCount }: any) => {
  const headCells = [
    {
      id: '_id',
      label: 'ID',
    },
    {
      id: 'title',
      label: 'Title',
    },
    {
      id: 'description',
      label: 'Description',
    },
    {
      id: 'project',
      label: 'Project Name',
    },
    {
      id: 'assignedEmployee',
      label: 'Assigned Employee',
    },
    {
      id: 'estimateHour',
      label: 'Estimate Hour',
    },
    {
      id: 'actualHour',
      label: 'Actual Hour',
    },
    {
      id: 'status',
      label: 'Status',
    },
    {
      id: 'estimate_start_date',
      label: 'Estimate Start Date',
    },
    {
      id: 'estimate_finish_date',
      label: 'Estimate Finish Date',
    },
    {
      id: 'actual_start_date',
      label: 'Actual Start Date',
    },
    {
      id: 'actual_finish_date',
      label: 'Actual Finish Date',
    },
    {
      id: 'action',
      label: 'Action',
    },
  ];
  // const chartData = generateChartData(headCells);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  console.log(dataCount);
  return (
    <>
      <Grid container spacing={3} sx={{ mt: 2, justifyContent: 'center' }}>
        <Grid item xs={12} sm={5.5} md={3}>
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
                <EmployeeIcon />
              </Box>
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="h1" sx={{ fontWeight: '600' }}>
                  {dataCount?.employees}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary" gutterBottom>
                  Total Employees
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5.5} md={3}>
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
                <ProjectIcon />
              </Box>
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="h1" sx={{ fontWeight: '600' }}>
                  {dataCount?.projects}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary" gutterBottom>
                  Total Projects
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5.5} md={3}>
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
                <TaskIcon />
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
        <Grid item xs={12} sm={5.5} md={3}>
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
                <ReportIcon />
              </Box>
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="h1" sx={{ fontWeight: '600' }}>
                  {dataCount?.reports}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary" gutterBottom>
                  Total Reports
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* <Bar data={chartData} options={options} /> */}
    </>
  );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default DashboardPage;

export async function getServerSideProps() {
  try {
    const [employeesRes, projectsRes, reportsRes] = await Promise.all([
      axios.get('http://localhost:8080/employees/list'),
      axios.get('http://localhost:8080/projects/list?page=1&limit=2000'),
      axios.get('http://localhost:8080/reports/list?page=1&limit=2000'),
    ]);

    const dataCount = {
      employees: employeesRes.data.data.length,
      projects: projectsRes.data.data.length,
      reports: reportsRes.data.data.length,
    };

    return {
      props: {
        dataCount,
      },
    };
  } catch (error) {
    console.log('An error occur while fetching data', error);
    return {
      props: {
        dataCount: {
          employees: 0,
          projects: 0,
          reports: 0,
        },
      },
    };
  }
}
