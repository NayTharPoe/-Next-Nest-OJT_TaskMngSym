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
import { BpCheckedIcon } from '../../components/checkbox'
import { BpIcon } from '../../components/checkbox';
import TableBtn from '../../components/tableBtn'
import ProjectSearchBox from '../../components/project-search-input'
import ConfirmDialog from '@/components/commonDialog';

interface Data {
  projectName: string,
  language: string,
  description: string,
  startDate: string,
  endDate: string,
}

function createData(
  projectName: string,
  language: string,
  description: string,
  startDate: string,
  endDate: string,
): Data {
  return {
    projectName,
    language,
    description,
    startDate,
    endDate,
  };
}

const rows = [
  createData('Cupcake', 'ReactJS', 'bah bah blah sheet', '2023-08-23', '2023-09-7'),
  createData('Donut', 'Python', 'bah bah blah sheet', '2023-08-23', '2023-09-7'),
  createData('Eclair', 'node', 'bah bah blah sheet', '2023-08-23', '2023-09-7'),
  createData('Frozen yoghurt', 'Golang', 'bah bah blah sheet', '2023-08-23', '2023-09-7'),
  createData('Gingerbread', 'Nuxt', 'bah bah blah sheet', '2023-08-23', '2023-09-7'),
  createData('Honeycomb', 'Next', 'bah bah blah sheet', '2023-08-23', '2023-09-7'),
  createData('Ice cream sandwich', 'Flutter', 'bah bah blah sheet', '2023-08-23', '2023-09-7'),
  createData('Jelly Bean', 'Dart', 'bah bah blah sheet', '2023-08-23', '2023-09-7'),
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
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
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
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'projectName',
    numeric: false,
    disablePadding: true,
    label: 'Project Name',
    
  },
  {
    id: 'language',
    numeric: false,
    disablePadding: false,
    label: 'Language',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'startDate',
    numeric: false,
    disablePadding: false,
    label: 'Start Date',
  },
  {
    id: 'endDate',
    numeric: false,
    disablePadding: false,
    label: 'End Date',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === 'actions' ? (
                <div>{headCell.label}</div>
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
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
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSearchInputChange = (event: { target: { value: any; }; }) => {
    const newSearchText = event.target.value;
    onSearchChange(newSearchText)
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <ProjectSearchBox value={searchText} inputSearch={handleSearchInputChange} />
        </Typography>
      )}
      {numSelected > 0 ? (
         <>
          <IconButton onClick={handleOpenDialog}>
            <DeleteIcon />
          </IconButton>
          <ConfirmDialog open={dialogOpen} onClose={handleCloseDialog}/>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

const ProjectListPage: NextPageWithLayout = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('projectName');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState<string>('')

  const handleSearchChange = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.projectName);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (name: string) => selected.indexOf(name) !== -1;

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
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(filterRows(rows, searchText), getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [order, orderBy, page, rowsPerPage, rows, searchText],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar 
         numSelected={selected.length}
         searchText={searchText}
         onSearchChange={handleSearchChange}
         />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
           
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.projectName);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.projectName)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.projectName}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="default"
                        checkedIcon={<BpCheckedIcon />}
                        icon={<BpIcon />}
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.projectName}
                    </TableCell>
                    <TableCell>{row.language}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.startDate}</TableCell>
                    <TableCell>{row.endDate}</TableCell>
                    <TableCell>
                      <TableBtn tableBtnText='Edit'/>
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
}

ProjectListPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ProjectListPage