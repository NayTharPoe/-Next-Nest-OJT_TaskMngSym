import React, { ReactElement, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box, Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddNewBtn from '@/components/addNewBtn';
import palette from '@/theme/palette';
import {
  TextFieldVariants,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
} from '@mui/material/TextField/TextField';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90, disableColumnMenu: true },
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
    disableColumnMenu: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 280,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'reportTo',
    headerName: 'Report To',
    width: 140,
    disableColumnMenu: true,
  },
  {
    field: 'reportBy',
    headerName: 'Report By',
    width: 110,
    disableColumnMenu: true,
  },
];

const rows = [
  { id: 1, date: '2023-09-09', description: 'desc', reportTo: 'James Thong', reportBy: 'james' },
  { id: 2, date: '2023-09-09', description: 'desc', reportTo: 'James Thong', reportBy: 'james' },
  { id: 3, date: '2023-09-09', description: 'desc', reportTo: 'James Thong', reportBy: 'james' },
  { id: 4, date: '2023-09-09', description: 'desc', reportTo: 'James Thong', reportBy: 'james' },
  { id: 5, date: '2023-09-09', description: 'desc', reportTo: 'James Thong', reportBy: 'james' },
  { id: 6, date: '2023-09-09', description: 'desc', reportTo: 'James Thong', reportBy: 'james' },
  { id: 7, date: '2023-09-09', description: 'desc', reportTo: 'James Thong', reportBy: 'james' },
];

const ReportListPage = () => {
  const [formData, setFormData] = useState({
    reportTo: '',
    reportBy: '',
    selectedDate: null,
  });

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
    // You can perform form submission logic here
    console.log('Form Data Submitted:', formData);
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              name="reportTo"
              id="report-to"
              value={formData.reportTo}
              onChange={handleInputChange}
              placeholder="Report To"
              variant="outlined"
              sx={{
                '.MuiOutlinedInput-input': {
                  p: '11.5px 14px',
                },
              }}
            />
            <TextField
              name="reportBy"
              id="report-by"
              value={formData.reportBy}
              onChange={handleInputChange}
              placeholder="Report By"
              variant="outlined"
              sx={{
                '.MuiOutlinedInput-input': {
                  p: '11.5px 14px',
                },
              }}
            />
            {/* <DatePicker
              name="selectedDate"
              value={formData.selectedDate}
              onChange={handleDateChange}
              renderInput={(params: any) => <TextField {...params} variant="outlined" />}
              margin="normal"
            /> */}
            <Button variant="contained" size="large" type="submit" onClick={handleSubmit}>
              Search
            </Button>
          </Box>
        </form>
        <AddNewBtn AddNewBtnText="Add Report" path="/report/add" />
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{ backgroundColor: palette.common.white, borderRadius: '.7rem' }}
      />
    </Box>
  );
};

export default ReportListPage;
ReportListPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
