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

const ReportListPage = ({ reports }: any) => {
  const [dataSource, setDataSource] = useState([]);
  const [formData, setFormData] = useState({
    reportTo: '',
    reportBy: '',
    selectedDate: null,
  });

  console.log(reports.data);
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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);

    // const formattedDate = dayjs(formData.selectedDate).format('YYYY-MM-DD') || 'null';
    // const reportTo = formData.reportTo ? formData.reportTo : 'null';
    // const reportBy = formData.reportBy ? formData.reportBy : 'null';
    // const api = `http://localhost:3000/reports/list?reportTo=${reportTo}&reportBy=${reportBy}&date=${formattedDate}`;
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}
      >
        <Grid item>
          <Box component="form" onClick={handleSubmit}>
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
                  onClick={handleSubmit}
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
        mt={2}
        container
        spacing={3}
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {reports?.data?.map((row: any) => {
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
                    width: '300px',
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
                    <Stack spacing={1} sx={{ mt: 1.75 }} direction={{ xs: 'column', sm: 'row' }}>
                      <Chip label={row.percentage + '%'} sx={{ backgroundColor: '#D9D8DF' }} />
                      <Chip label={row.types} sx={{ backgroundColor: '#DACEF2' }} />
                      <Chip label={statusOptions.find((option) => option.value === row.status)?.label} />
                      <Chip label={row.hour + 'hrs'} sx={{ backgroundColor: '#F2CED6' }} />
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
