import * as React from 'react';
import { ReactElement, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddNewBtn from '@/components/addNewBtn';
import palette from '@/theme/palette';
import dayjs from 'dayjs';
import { report } from 'process';
import axios from 'axios';
import { useRouter } from 'next/router';

const ReportListPage = ({ reports }: any) => {
  const [dataSource, setDataSource] = useState(reports.data);
  const [formData, setFormData] = useState({
    reportTo: '',
    reportBy: '',
    selectedDate: null,
  });
  const router = useRouter();

  const statusOptions = [
    { value: 0, label: 'Open' },
    { value: 1, label: 'In Progress' },
    { value: 2, label: 'Finish' },
    { value: 3, label: 'Close' },
  ];

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date: any) => {
    setFormData({
      ...formData,
      selectedDate: date,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formattedDate = formData.selectedDate ? dayjs(formData.selectedDate).format('YYYY-MM-DD') : '';

    const queryParams: Record<string, string | number> = {
      page: 1,
      limit: 2000,
    };

    if (formData.reportTo) {
      queryParams.reportTo = formData.reportTo;
    }

    if (formData.reportBy) {
      queryParams.reportBy = formData.reportBy;
    }

    if (formattedDate) {
      queryParams.date = formattedDate;
    }

    const reportToParam = formData.reportTo ? `&reportTo=${formData.reportTo}` : '';
    const reportByParam = formData.reportBy ? `&reportTo=${formData.reportBy}` : '';
    const dateParam = formData.selectedDate ? `&date=${formattedDate}` : '';
    router.push(`${router.pathname}?page=1&limit=2000${reportToParam}${reportByParam}${dateParam}`);

    try {
      const response = await axios.get('http://localhost:8080/reports/list', {
        params: queryParams,
      });

      console.log('API Response:', response.data);
      setDataSource(response.data.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <Box sx={{ height: 400, width: '100%', my: 4 }}>
      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}
      >
        <Grid item>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={6} sm={3}>
                <TextField
                  name="reportTo"
                  id="report-to"
                  value={formData.reportTo}
                  onChange={handleInputChange}
                  placeholder="Report To"
                  variant="outlined"
                  sx={{
                    '.MuiInputBase-root': {
                      borderRadius: '.4rem',
                    },
                    '.MuiOutlinedInput-input': {
                      p: '11.5px 14px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  name="reportBy"
                  id="report-by"
                  value={formData.reportBy}
                  onChange={handleInputChange}
                  placeholder="Report By"
                  variant="outlined"
                  sx={{
                    '.MuiInputBase-root': {
                      borderRadius: '.4rem',
                    },
                    '.MuiOutlinedInput-input': {
                      p: '11.5px 14px',
                      borderRadius: '.7rem',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <DatePicker
                  format="YYYY/MM/DD"
                  value={formData.selectedDate}
                  onChange={(newValue: any) => handleDateChange(newValue)}
                  sx={{
                    '.MuiInputBase-root': {
                      borderRadius: '.4rem',
                    },
                    '.MuiOutlinedInput-input': {
                      p: '11.5px 14px',
                      borderRadius: '.7rem',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{
                    backgroundColor: palette.primary.main,
                    color: palette.text.primary,
                    borderRadius: '.7rem',
                    '&:hover': {
                      backgroundColor: palette.primary.main,
                      boxShadow: 'none',
                    },
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item>
          <AddNewBtn AddNewBtnText="Add Report" path="/report/add" />
        </Grid>
      </Grid>
      <Grid
        py={4}
        container
        spacing={3}
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {dataSource?.map((row: any) => {
          return (
            <Grid key={row._id} item>
              <Card
                sx={{
                  bgcolor: palette.common.white,
                  boxShadow: 'none',
                  width: '340px',
                  p: 1,
                  borderRadius: '1.4rem',
                  '@media (min-width: 320px)': {
                    width: '335px',
                  },
                }}
              >
                <CardContent>
                  <Box>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                      }}
                      alt="img"
                      src="https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_default.jpg"
                    />
                    <Typography sx={{ my: 1 }}>
                      <Box component="span" sx={{ fontWeight: '600', fontSize: '1.2rem' }}>
                        {row.reportBy.employeeName}
                      </Box>{' '}
                      ({row.reportBy.position === '1' ? 'Member' : 'Admin'})
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>Report To : {row.reportTo}</Typography>
                    <Typography>Project : {row.project}</Typography>

                    <Typography>【所感】Problem : {row.problemFeeling}</Typography>
                    <Typography>【実績】- {row.taskTitle}</Typography>
                    <Typography>Date : {dayjs(row.createdAt).format('YYYY-MM-DD')}</Typography>
                    <Stack spacing={1} sx={{ mt: 1.75 }} direction={{ xs: 'column', sm: 'row' }}>
                      <Chip label={row.percentage + '%'} sx={{ backgroundColor: '#D9D8DF' }} />
                      <Chip label={row.types} sx={{ backgroundColor: '#DACEF2' }} />
                      <Chip label={statusOptions.find((option) => option.value === row.status)?.label} />
                      <Chip label={row.hours + 'hrs'} sx={{ backgroundColor: '#F2CED6' }} />
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ReportListPage;
ReportListPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:8080/reports/list?page=1&limit=1000`);
  const reports = await res.json();

  return { props: { reports } };
}
