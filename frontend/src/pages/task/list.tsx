import * as React from "react";
import { ReactElement, useState, useEffect } from "react";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import MainLayout from "@/layouts/MainLayout";
import AddIcon from "@mui/icons-material/Add";
import type { NextPageWithLayout } from "../_app";
import TableBtn from "@/components/tableBtn";
import ProjectSearchBox from "@/components/project-search-input";
import ConfirmDialog from "@/components/commonDialog";
import palette from "@/theme/palette";
import { useRouter } from "next/navigation";
import axios from "axios";
import dayjs from "dayjs";

interface Data {
  _id: string;
  num: string;
  title: string;
  description: string;
  project: string;
  assignedEmployee: string;
  estimateHour: number;
  actualHour: number;
  status: string;
  estimate_start_date: string;
  estimate_finish_date: string;
  actual_start_date: string;
  actual_finish_date: string;
}

function createData(
  _id: string,
  num: string,
  title: string,
  description: string,
  project: string,
  assignedEmployee: string,
  estimateHour: number,
  actualHour: number,
  status: string,
  estimate_start_date: string,
  estimate_finish_date: string,
  actual_start_date: string,
  actual_finish_date: string
): Data {
  return {
    _id,
    num,
    title,
    description,
    project,
    assignedEmployee,
    estimateHour,
    actualHour,
    status,
    estimate_start_date,
    estimate_finish_date,
    actual_start_date,
    actual_finish_date,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
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
  id: string;
  disablePadding: boolean;
  minWidth?: number;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "_id",
    numeric: false,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "title",
    numeric: false,
    minWidth: 120,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "description",
    numeric: false,
    minWidth: 150,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "project",
    numeric: false,
    minWidth: 140,
    disablePadding: false,
    label: "Project Name",
  },
  {
    id: "assignedEmployee",
    numeric: false,
    minWidth: 140,
    disablePadding: false,
    label: "Assigned Employee",
  },
  {
    id: "estimateHour",
    numeric: false,
    minWidth: 100,
    disablePadding: false,
    label: "Estimate Hour",
  },
  {
    id: "actualHour",
    numeric: false,
    disablePadding: false,
    label: "Actual Hour",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "estimate_start_date",
    numeric: false,
    minWidth: 150,
    disablePadding: false,
    label: "Estimate Start Date",
  },
  {
    id: "estimate_finish_date",
    numeric: false,
    minWidth: 150,
    disablePadding: false,
    label: "Estimate Finish Date",
  },
  {
    id: "actual_start_date",
    numeric: false,
    minWidth: 150,
    disablePadding: false,
    label: "Actual Start Date",
  },
  {
    id: "actual_finish_date",
    numeric: false,
    minWidth: 150,
    disablePadding: false,
    label: "Actual Finish Date",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ ".MuiTableSortLabel-root": { fontSize: "1rem" } }}
          >
            {headCell.id === "actions" ? (
              <TableSortLabel
                style={{ minWidth: headCell.minWidth }}
                sx={{ ".MuiSvgIcon-root": { display: "none" } }}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                style={{ minWidth: headCell.minWidth }}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
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
          bgcolor: (theme: any) =>
            alpha(
              theme.palette.charcoal.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography
        // sx={{ flex: "1 1 100%", display: "flex", gap: "2" }}
        sx={{ display: "flex", alignItems: "center" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        <ProjectSearchBox
          value={searchText}
          inputSearch={handleSearchInputChange}
        />
        {/* <Select
          size="small"
          sx={{ marginLeft: "15px", width: "30%" }}
          value={selectStatus}
          onChange={handleChange}
        >
          <MenuItem value="0">Opened</MenuItem>
          <MenuItem value="1">In progress</MenuItem>
          <MenuItem value="2">Finished</MenuItem>
          <MenuItem value="3">Closed</MenuItem>
          <MenuItem value="4">All</MenuItem>
        </Select> */}
      </Typography>
    </Toolbar>
  );
}

const AddButton = (props: any) => {
  return (
    <Button
      variant="contained"
      sx={{
        padding: "10px 15px",
        borderRadius: "25px",
        boxShadow: "none",
        background: palette.primary.main,
        color: palette.text.primary,
        "&:hover": {
          background: palette.primary.main,
          borderColor: palette.primary.border,
          boxShadow: "none",
        },
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

const TaskList: NextPageWithLayout = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("project");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [IdToDelete, setIdToDelete] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const router = useRouter();

  const statusOption = [
    { value: "0", label: "Opened" },
    { value: "1", label: "In progress" },
    { value: "2", label: "Finished" },
    { value: "3", label: "Closed" },
  ];

  useEffect(() => {
    const taskApi = async () => {
      const taskApi = await axios.get(
        "http://localhost:8080/tasks/list?limit=30"
      );
      const projectApi = await axios.get(
        "http://localhost:8080/projects/list?limit=30"
      );
      const employeeApi = await axios.get(
        "http://localhost:8080/employees/list?limit=30"
      );
      const taskData = taskApi.data.data.map((task: any, index: any) => {
        const statusValue = statusOption.find(
          (option) => option.value === task.status
        )?.label;
        return {
          ...task,
          num: task._id.length + index - 23,
          project: projectApi.data.data.filter(
            (projectData: any) => projectData._id === task.project._id
          )[0].projectName,
          assignedEmployee: employeeApi.data.data.filter(
            (employee: any) => employee._id === task.assignedEmployee._id
          )[0].employeeName,
          status: statusValue ? statusValue : "Open",
          actualHour: task.actualHour ? task.actualHour : "-",
          estimate_start_date: task.estimate_start_date
            ? dayjs(task.estimate_start_date).format("MM-DD-YYYY")
            : "-",
          estimate_finish_date: task.estimate_finish_date
            ? dayjs(task.estimate_finish_date).format("MM-DD-YYYY")
            : "-",
          actual_start_date: task.actual_start_date
            ? dayjs(task.actual_start_date).format("MM-DD-YYYY")
            : "-",
          actual_finish_date: task.actual_finish_date
            ? dayjs(task.actual_finish_date).format("MM-DD-YYYY")
            : "-",
        };
      });
      setTaskList(taskData);
    };
    taskApi();
  }, []);

  const handleSearchChange = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    console.log(property);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function filterRows(rows: Data[], searchText: string): Data[] {
    const filteredRows = rows.filter((row) => {
      const { title, project, assignedEmployee, status } = row;

      return (
        title.toLowerCase().includes(searchText.toLowerCase().trim()) ||
        project.toLowerCase().includes(searchText.toLowerCase().trim()) ||
        assignedEmployee
          .toLowerCase()
          .includes(searchText.toLowerCase().trim()) ||
        status.toLocaleLowerCase().includes(searchText.toLowerCase().trim())
      );
    });

    return filteredRows;
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - taskList.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(
        filterRows(taskList, searchText),
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy, page, rowsPerPage, taskList, searchText]
  );

  const handleEditProject = (e: any, id: string) => {
    router.push(`/task/edit/${id}`);
  };

  const handleOpenDialog = (id: any) => {
    setDialogOpen(true);
    setIdToDelete(id);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <AddButton onClick={() => router.push("/task/add")}>
          <AddIcon fontSize="small" sx={{ mr: 1 }} /> New Task
        </AddButton>
      </Box>
      <Paper
        sx={{
          "media (min-width : 300px)": { width: "calc(100% - 290px)" },
          mb: 2,
          mt: 3,
          p: 2,
          background: palette.common.white,
          borderRadius: "1.1rem",
        }}
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          searchText={searchText}
          onSearchChange={handleSearchChange}
        />
        <TableContainer>
          <Table sx={{}} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, _index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    key={row._id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell sx={{ fontSize: ".9rem" }}>{row.num}</TableCell>
                    <TableCell sx={{ fontSize: ".9rem" }}>
                      {row.title}
                    </TableCell>
                    <TableCell sx={{ fontSize: ".9rem" }}>
                      {row.description}
                    </TableCell>
                    <TableCell sx={{ fontSize: ".9rem" }}>
                      {row.project}
                    </TableCell>
                    <TableCell sx={{ fontSize: ".9rem" }}>
                      {row.assignedEmployee}
                    </TableCell>
                    <TableCell sx={{ fontSize: ".9rem" }}>
                      {row.estimateHour}
                    </TableCell>
                    <TableCell sx={{ fontSize: ".9rem" }}>
                      {row.actualHour}
                    </TableCell>
                    <TableCell sx={{ fontSize: ".9rem" }}>
                      {row.status}
                    </TableCell>
                    <TableCell sx={{ fontSize: ".9rem" }}>
                      {row.estimate_start_date}
                    </TableCell>
                    <TableCell sx={{ fontSize: ".9rem" }}>
                      {row.estimate_finish_date}
                    </TableCell>
                    <TableCell sx={{ fontSize: ".9rem" }}>
                      {row.actual_start_date}
                    </TableCell>
                    <TableCell sx={{ fontSize: ".9rem" }}>
                      {row.actual_finish_date}
                    </TableCell>
                    <TableCell sx={{ display: "flex" }}>
                      <TableBtn
                        onClick={(event: any) =>
                          handleEditProject(event, row._id)
                        }
                      >
                        Edit
                      </TableBtn>
                      <ConfirmDialog
                        open={dialogOpen}
                        onClose={handleCloseDialog}
                        id={IdToDelete}
                      />
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
          count={taskList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

TaskList.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default TaskList;
