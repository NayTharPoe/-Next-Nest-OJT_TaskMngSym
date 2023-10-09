import React, { ReactElement, useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from './_app';
import { Box, Card, CardContent, Grid, Typography, Chip, Button } from '@mui/material';
import palette from '@/theme/palette';
import ProjectIcon from '@/components/icons/ProjectIcon';
import ReportIcon from '@/components/icons/ReportIcon';
import EmployeeIcon from '@/components/icons/EmployeeIcon';
import TaskIcon from '@/components/icons/TaskIcon';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { StyledGridOverlay } from '@/components/styledGridOverlay';
import config from '@/config';

const CustomNoRowsOverlay = () => {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width="240"
        height="150"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse className="ant-empty-img-5" cx="67.797" cy="106.89" rx="67.797" ry="12.668" />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Data</Box>
    </StyledGridOverlay>
  );
};

const DashboardPage: NextPageWithLayout = ({ dataCount, taskData }: any) => {
  const [filterRow, setFilterRow] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState<any>({});
  const router = useRouter();
  const columns: GridColDef[] = [
    {
      field: 'displayId',
      headerName: 'ID',
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 160,
      disableColumnMenu: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 180,
      disableColumnMenu: true,
    },
    {
      field: 'project',
      headerName: 'Project Name',
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: 'assignedEmployee',
      headerName: 'Assigned Employee',
      width: 160,
      disableColumnMenu: true,
    },
    {
      field: 'estimateHour',
      headerName: 'Estimate Hour',
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'actualHour',
      disableColumnMenu: true,
      headerName: 'Actual Hour',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: { row: any }) => {
        const row = params.row;
        let hex;
        let bgHex;
        let border;
        let label;
        switch (row.status) {
          case '0':
            hex = '#2499ef';
            bgHex = '#2499ef33';
            border = '#2499ef33';
            label = 'Opened';
            break;
          case '1':
            hex = '#c6a808';
            bgHex = '#ffcb1f33';
            border = '#ffe90033';
            label = 'In progress';
            break;
          case '2':
            hex = '#52c41a';
            bgHex = '#8fff8f4d';
            border = '#8fff8f4d';
            label = 'Finished';
            break;
        }
        return (
          <Chip
            label={label}
            sx={{ color: hex, backgroundColor: bgHex, borderColor: border }}
            variant="outlined"
          />
        );
      },
    },
    {
      field: 'estimate_start_date',
      headerName: 'Estimate Start Date',
      width: 180,
      disableColumnMenu: true,
      align: 'center',
    },
    {
      field: 'estimate_finish_date',
      headerName: 'Estimate Finish Date',
      width: 180,
      disableColumnMenu: true,
      align: 'center',
    },
    {
      field: 'actual_start_date',
      headerName: 'Actual Start Date',
      width: 180,
      disableColumnMenu: true,
      align: 'center',
    },
    {
      field: 'actual_finish_date',
      headerName: 'Actual Finish Date',
      width: 180,
      disableColumnMenu: true,
      align: 'center',
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: { row: any }) => {
        const row = params.row;
        return (
          <Button
            sx={{
              boxShadow: 'none',
              textTransform: 'none',
              fontSize: 13,
              padding: '3px 20px',
              border: '1px solid',
              borderRadius: '20px',
              backgroundColor: palette.secondary.main,
              color: palette.text.primary,
              borderColor: palette.secondary.main,
              marginRight: '10px',
              '&:hover': {
                backgroundColor: palette.secondary.main,
                borderColor: palette.secondary.main,
                boxShadow: 'none',
              },
              '&:active': {
                boxShadow: 'none',
                backgroundColor: palette.secondary.main,
                borderColor: palette.secondary.main,
              },
            }}
            onClick={() => router.push(`/task/edit/${row._id}`)}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  const formattedRow = taskData?.data
    .filter((task: any) => task.status !== '3')
    .map((task: any, index: number) => ({
      _id: task._id,
      displayId: index + 1,
      title: task?.title,
      description: task.description ? task.description : '-',
      project: task?.project?.projectName ? task?.project?.projectName : '-',
      assignedEmployee: task?.assignedEmployee?.employeeName ? task?.assignedEmployee?.employeeName : '-',
      estimateHour: task.estimateHour ? task.estimateHour + ' hrs' : '-',
      actualHour: task.actualHour ? task.actualHour + ' hrs' : '-',
      status: task?.status,
      estimate_start_date: task.estimate_start_date ? task.estimate_start_date : 'N/A',
      estimate_finish_date: task.estimate_finish_date ? task.estimate_finish_date : 'N/A',
      actual_start_date: task.actual_start_date ? task.actual_start_date : 'N/A',
      actual_finish_date: task.actual_finish_date ? task.actual_finish_date : 'N/A',
    }));

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const currentUserData = JSON.parse(user);
      setLoggedInUser(currentUserData);

      if (currentUserData?.position !== '1') {
        const result = formattedRow?.filter(
          (task: any) => task?.assignedEmployee === currentUserData?.employeeName
        );
        setFilterRow(result);
      } else {
        setFilterRow(formattedRow);
      }
    }
  }, []);

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 2, justifyContent: 'center' }}>
        <Grid item xs={12} sm={5.5} md={3}>
          <Card
            onClick={() => router.push('/employee/list')}
            sx={{
              borderRadius: '1.2rem',
              backgroundColor: palette.common.white,
              boxShadow: 'none',
              cursor: 'pointer',
            }}
          >
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
                  backgroundColor: '#ff977733',
                  width: '60px',
                  height: '60px',
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
          <Card
            onClick={() => router.push('/project/list')}
            sx={{
              borderRadius: '1.2rem',
              backgroundColor: palette.common.white,
              boxShadow: 'none',
              cursor: 'pointer',
            }}
          >
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
                  backgroundColor: '#a798ff33',
                  width: '60px',
                  height: '60px',
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
          <Card
            onClick={() => router.push('/task/list')}
            sx={{
              borderRadius: '1.2rem',
              backgroundColor: palette.common.white,
              boxShadow: 'none',
              cursor: 'pointer',
            }}
          >
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
                  backgroundColor: '#ff6b9333',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TaskIcon />
              </Box>
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="h1" sx={{ fontWeight: '600' }}>
                  {dataCount?.tasks}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary" gutterBottom>
                  Total Tasks
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5.5} md={3}>
          <Card
            onClick={() => router.push('/report/list')}
            sx={{
              borderRadius: '1.2rem',
              backgroundColor: palette.common.white,
              boxShadow: 'none',
              cursor: 'pointer',
            }}
          >
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
                  backgroundColor: '#2499ef33',
                  width: '60px',
                  height: '60px',
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
      <Box sx={{ width: '100%', my: 5 }}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 3 }}>
          Top Not Closed Tasks
        </Typography>
        <DataGrid
          rows={filterRow}
          columns={columns}
          getRowId={(row) => row._id}
          getRowHeight={() => 'auto'}
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
          sx={{
            backgroundColor: palette.common.white,
            borderRadius: '1rem',
            '.MuiDataGrid-cell': { py: '20px' },
            '.MuiDataGrid-cell:focus,.MuiDataGrid-columnHeader:focus,.MuiDataGrid-cell:focus-within,.MuiDataGrid-columnHeader:focus-within':
              {
                outline: 'none',
              },
            '.MuiDataGrid-columnHeaders': { fontSize: '.95rem', py: '2.3rem' },
            '.MuiDataGrid-cellContent': { fontSize: '.85rem' },
            '.MuiDataGrid-footerContainer': { display: 'none' },
          }}
        />
        <Box sx={{ textAlign: 'center' }}>
          <Button
            sx={{
              padding: '10px 30px',
              mt: '2rem',
              backgroundColor: palette.primary.main,
              color: palette.text.primary,
              borderColor: palette.primary.border,
              '&:hover': {
                backgroundColor: palette.primary.main,
                borderColor: palette.primary.border,
                boxShadow: 'none',
              },
              '&:active': {
                boxShadow: 'none',
                backgroundColor: palette.primary.main,
                borderColor: palette.primary.border,
              },
            }}
            onClick={() => router.push('/task/list')}
          >
            View All
          </Button>
        </Box>
      </Box>
    </>
  );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default DashboardPage;

export async function getServerSideProps() {
  try {
    const [employeesRes, tasksRes, projectsRes, reportsRes] = await Promise.all([
      axios.get(`${config.SERVER_DOMAIN}/employees/list?page=1&limit=2000`),
      axios.get(`${config.SERVER_DOMAIN}/tasks/list?page=1&limit=2000`),
      axios.get(`${config.SERVER_DOMAIN}/projects/list?page=1&limit=2000`),
      axios.get(`${config.SERVER_DOMAIN}/reports/list?page=1&limit=2000`),
    ]);

    const dataCount = {
      employees: employeesRes?.data?.totalEmployee,
      tasks: tasksRes?.data?.totalTasks,
      projects: projectsRes?.data?.count,
      reports: reportsRes?.data?.count,
    };

    const taskData = {
      data: tasksRes?.data?.data,
    };

    return {
      props: {
        dataCount,
        taskData,
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
          tasks: 0,
        },
      },
    };
  }
}
