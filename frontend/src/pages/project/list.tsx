import React, { ReactElement, useState, useRef, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, InputAdornment, TablePagination, TextField } from '@mui/material';
import AddNewBtn from '@/components/button/addNewBtn';
import TableBtn from '@/components/tableBtn';
import ConfirmDialog from '@/components/commonDialog';
import palette from '@/theme/palette';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import axios from 'axios';

const ProjectListPage = ({ projects }: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [IdToDelete, setIdToDelete] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

  const router = useRouter();

  const columns: GridColDef[] = [
    {
      field: 'displayId',
      headerName: 'ID',
      width: 80,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'projectName',
      headerName: 'Project Name',
      width: 160,
      disableColumnMenu: true,
    },
    {
      field: 'language',
      headerName: 'Language',
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 180,
      disableColumnMenu: true,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 130,
      disableColumnMenu: true,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 130,
      disableColumnMenu: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 160,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const row = params.row;
        return (
          <Box sx={{ display: 'flex' }}>
            <TableBtn onClick={() => handleEditProject(row._id)}>Edit</TableBtn>
            <TableBtn onClick={() => handleOpenDialog(row._id)}>Remove</TableBtn>
          </Box>
        );
      },
    },
  ];

  const rows: any = projects?.data?.map((row: any, index: number) => ({
    _id: row._id,
    displayId: index + 1,
    projectName: row.projectName,
    language: row.language,
    description: row.description,
    startDate: dayjs(row.startDate).format('YYYY-MM-DD'),
    endDate: dayjs(row.endDate).format('YYYY-MM-DD'),
  }));

  useEffect(() => {
    const filterRows: any = (rows: any[], searchText: string) => {
      return rows.filter((row) => {
        const { projectName, language, description, startDate, endDate } = row;

        return (
          projectName?.toLowerCase().includes(searchText.toLowerCase().trim()) ||
          language?.toLowerCase().includes(searchText.toLowerCase().trim()) ||
          description?.toLowerCase().includes(searchText.toLowerCase().trim()) ||
          startDate?.toLowerCase().includes(searchText.toLowerCase().trim()) ||
          endDate?.toLowerCase().includes(searchText.toLowerCase().trim())
        );
      });
    };

    setFilteredRows(filterRows(rows, searchText));
  }, [searchText]);

  const handleEditProject = (id: number) => {
    router.push(`/project/edit/${id}`);
  };

  const handleOpenDialog = (id: any) => {
    setDialogOpen(true);
    setIdToDelete(id);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleDeleteProject = async (id: any) => {
    try {
      setFilteredRows((prevFilteredRows) => prevFilteredRows.filter((row: { _id: any }) => row._id !== id));
      const res = await axios.delete(`http://localhost:8080/project/delete/${id}`);
      setDialogOpen(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(projects);

  return (
    <Box sx={{ height: 550 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 3 }}>
        <TextField
          name="search"
          id="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search ...."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            '.MuiInputBase-root': {
              borderRadius: '.4rem',
            },
            '.MuiOutlinedInput-input': {
              p: '11.5px 14px',
              pl: 0,
            },
          }}
        />
        <AddNewBtn AddNewBtnText="Add New Project" path={'/project/add'} />
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row._id}
        getRowHeight={() => 'auto'}
        sx={{
          backgroundColor: palette.common.white,
          borderRadius: '.7rem',
          '.MuiDataGrid-cell': { py: '20px' },
          '.MuiDataGrid-columnHeaders': { fontSize: '.95rem', py: '2.3rem' },
          '.MuiDataGrid-cellContent': { fontSize: '.85rem' },
          '.MuiDataGrid-footerContainer': { display: 'none' },
        }}
      />
      <ConfirmDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onClick={() => handleDeleteProject(IdToDelete)}
      />
    </Box>
  );
};

export default ProjectListPage;
ProjectListPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:8080/projects/list`);
  const projects = await res.json();

  return { props: { projects } };
}
