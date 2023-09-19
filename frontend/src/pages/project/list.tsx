import * as React from 'react';
import { ReactElement, useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import MainLayout from '@/layouts/MainLayout';
import type { NextPageWithLayout } from '../_app';
import TableBtn from '../../components/button/tableBtn';
import ProjectSearchBox from '../../components/ProjectSearchBox';
import ConfirmDialog from '@/components/CommonDialog';
import AddNewBtn from '@/components/button/addNewBtn';
import palette from '@/theme/palette';
import { useRouter } from 'next/navigation';

interface Data {
  id: number;
  projectName: string;
  language: string;
  description: string;
  startDate: string;
  endDate: string;
}

function createData(
  id: number,
  projectName: string,
  language: string,
  description: string,
  startDate: string,
  endDate: string
): Data {
  return {
    id,
    projectName,
    language,
    description,
    startDate,
    endDate,
  };
}

const rows = [
  createData(1, 'Cupcake', 'ReactJS', 'bah bah blah sheet', '2023-08-23', '2023-09-7'),
  createData(2, 'Donut', 'Python', 'bah bah blah sheet', '2023-08-23', '2023-09-7'),
  createData(3, 'Eclair', 'node', 'bah bah blah sheet', '2023-08-23', '2023-09-7'),
  createData(4, 'Frozen yoghurt', 'Golang', 'bah bah blah sheet', '2023-08-23', '2023-09-7'),
  createData(5, 'Gingerbread', 'Nuxt', 'bah bah blah sheet', '2023-08-23', '2023-09-7'),
  createData(6, 'Honeycomb', 'Next', 'bah bah blah sheet', '2023-08-23', '2023-09-7'),
  createData(7, 'Ice cream sandwich', 'Flutter', 'bah bah blah sheet', '2023-08-23', '2023-09-7'),
  createData(8, 'Jelly Bean', 'Dart', 'bah bah blah sheet', '2023-08-23', '2023-09-7'),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: any;
  disablePadding: boolean;
  minWidth?: number;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'projectName',
    numeric: false,
    minWidth: 140,
    disablePadding: false,
    label: 'Project Name',
  },
  {
    id: 'language',
    numeric: false,
    minWidth: 120,
    disablePadding: false,
    label: 'Language',
  },
  {
    id: 'description',
    numeric: false,
    minWidth: 170,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'startDate',
    numeric: false,
    minWidth: 120,
    disablePadding: false,
    label: 'Start Date',
  },
  {
    id: 'endDate',
    numeric: false,
    minWidth: 100,
    disablePadding: false,
    label: 'End Date',
  },
  {
    id: 'actions',
    numeric: false,
    minWidth: 170,
    disablePadding: false,
    label: 'Actions',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ '.MuiTableSortLabel-root': { fontSize: '1rem' } }}
          >
            {headCell.id === 'actions' ? (
              <TableSortLabel
                style={{ minWidth: headCell.minWidth }}
                sx={{ '.MuiSvgIcon-root': { display: 'none' } }}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                style={{ minWidth: headCell.minWidth }}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  searchText: string;
  onSearchChange: (newSearchText: string) => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, searchText, onSearchChange } = props;
  const handleSearchInputChange = (event: { target: { value: any } }) => {
    const newSearchText = event.target.value;
    onSearchChange(newSearchText);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme: any) => alpha(theme.palette.charcoal.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        <ProjectSearchBox value={searchText} inputSearch={handleSearchInputChange} />
      </Typography>
    </Toolbar>
  );
}

const ProjectListPage: NextPageWithLayout = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('projectName');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [IdToDelete, setIdToDelete] = useState(null);
  const router = useRouter();

  const handleSearchChange = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function filterRows(rows: Data[], searchText: string): Data[] {
    const filteredRows = rows.filter((row) => {
      const { projectName, language, description, startDate, endDate } = row;

      return (
        projectName.toLowerCase().includes(searchText.toLowerCase().trim()) ||
        language.toLowerCase().includes(searchText.toLowerCase().trim()) ||
        description.toLowerCase().includes(searchText.toLowerCase().trim()) ||
        startDate.toLowerCase().includes(searchText.toLowerCase().trim()) ||
        endDate.toLowerCase().includes(searchText.toLowerCase().trim())
      );
    });

    return filteredRows;
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(filterRows(rows, searchText), getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy, page, rowsPerPage, rows, searchText]
  );

  const handleEditProject = (e: any, id: number) => {
    e.stopPropagation();
    e.preventDefault();

    router.push(`/project/edit/${id}`);
  };

  const handleOpenDialog = (id: any) => {
    setDialogOpen(true);
    setIdToDelete(id);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <AddNewBtn AddNewBtnText="Add New Project" path={'/project/add'} />
      </Box>
      <Paper
        sx={{ width: '100%', mb: 2, mt: 3, p: 2, background: palette.common.white, borderRadius: '1.1rem' }}
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          searchText={searchText}
          onSearchChange={handleSearchChange}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {visibleRows.map((row, _index) => {
                return (
                  <TableRow hover role="checkbox" key={row.id} sx={{ cursor: 'pointer' }}>
                    <TableCell sx={{ fontSize: '.9rem' }}>{row.id}</TableCell>
                    <TableCell sx={{ fontSize: '.9rem' }}>{row.projectName}</TableCell>
                    <TableCell sx={{ fontSize: '.9rem' }}>{row.language}</TableCell>
                    <TableCell sx={{ fontSize: '.9rem' }}>{row.description}</TableCell>
                    <TableCell sx={{ fontSize: '.9rem' }}>{row.startDate}</TableCell>
                    <TableCell sx={{ fontSize: '.9rem' }}>{row.endDate}</TableCell>
                    <TableCell sx={{ display: 'flex' }}>
                      <TableBtn onClick={(event: any) => handleEditProject(event, row.id)}>Edit</TableBtn>
                      <TableBtn onClick={() => handleOpenDialog(row.id)}>Remove</TableBtn>
                      <ConfirmDialog open={dialogOpen} onClose={handleCloseDialog} id={IdToDelete} />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

ProjectListPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ProjectListPage;
