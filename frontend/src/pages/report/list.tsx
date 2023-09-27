import React, { ReactElement, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { DataGrid, GridColDef, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, Button, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddNewBtn from '@/components/addNewBtn';
import palette from '@/theme/palette';
import dayjs from 'dayjs';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
    disableColumnMenu: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 480,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      return <div dangerouslySetInnerHTML={{ __html: params.value }} />;
    },
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
  {
    id: 1,
    date: '2023-09-09',
    description: `
    <p>Report To: James Thong</p>
    <p>Project: Project 01</p>
    【実績】<br>
    - Task 1, < 23% >, < Review >, < In Progress >, < 8hr > <br>
    【所感】
    <p>Problem: - Nothing</p>`,
    reportTo: 'James Thong',
    reportBy: 'james',
  },
  {
    id: 2,
    date: '2023-09-09',
    description: `
    <p>Report To: James Thong</p>
    <p>Project: Project 01</p>
    【実績】<br>
    - Task 1, < 23% >, < Review >, < In Progress >, < 8hr > <br>
    【所感】
    <p>Problem: - Nothing</p>`,
    reportTo: 'James Thong',
    reportBy: 'james',
  },
  {
    id: 3,
    date: '2023-09-09',
    description: `
    <p>Report To: James Thong</p>
    <p>Project: Project 01</p>
    【実績】<br>
    - Task 1, < 23% >, < Review >, < In Progress >, < 8hr > <br>
    【所感】
    <p>Problem: - Nothing</p>`,
    reportTo: 'James Thong',
    reportBy: 'james',
  },
  {
    id: 4,
    date: '2023-09-09',
    description: `
    <p>Report To: James Thong</p>
    <p>Project: Project 01</p>
    【実績】<br>
    - Task 1, < 23% >, < Review >, < In Progress >, < 8hr > <br>
    【所感】
    <p>Problem: - Nothing</p>`,
    reportTo: 'James Thong',
    reportBy: 'james',
  },
];

const ReportListPage = () => {
  const [dataSource, setDataSource] = useState([]);
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

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    const formattedDate = dayjs(formData.selectedDate).format('YYYY-MM-DD') || 'null';
    const reportTo = formData.reportTo ? formData.reportTo : 'null';
    const reportBy = formData.reportBy ? formData.reportBy : 'null';
    const api = `http://localhost:3000/reports/list?reportTo=${reportTo}&reportBy=${reportBy}&date=${formattedDate}`;

    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setDataSource(data);
      });
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}
      >
        <Grid item>
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
                  '.MuiInputBase-root': {
                    borderRadius: '.4rem',
                  },
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
                  '.MuiInputBase-root': {
                    borderRadius: '.4rem',
                  },
                  '.MuiOutlinedInput-input': {
                    p: '11.5px 14px',
                    borderRadius: '.7rem',
                  },
                }}
              />
              <DatePicker
                value={formData.selectedDate}
                onChange={(newValue) => handleDateChange(newValue)}
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
            </Box>
          </form>
        </Grid>
        <Grid item>
          <AddNewBtn AddNewBtnText="Add Report" path="/report/add" />
        </Grid>
      </Grid>
      <Box sx={{ height: 550 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowHeight={() => 'auto'}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          slots={{ toolbar: CustomToolbar }}
          sx={{
            backgroundColor: palette.common.white,
            borderRadius: '.7rem',
            '.MuiDataGrid-cell': { py: '20px' },
            '.MuiDataGrid-columnHeadersInner': { fontSize: '1rem' },
            '.MuiDataGrid-row': { fontSize: '.9rem' },
          }}
        />
      </Box>
    </Box>
  );
};

export default ReportListPage;
ReportListPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
