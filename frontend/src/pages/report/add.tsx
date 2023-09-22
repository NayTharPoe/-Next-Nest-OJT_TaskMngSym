import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Paper, TextField, Select, MenuItem, Typography, FormHelperText } from '@mui/material';
import palette from '@/theme/palette';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const typesOptions = [
  { value: 'review', label: 'Review' },
  { value: 'coding', label: 'Coding' },
  { value: 'learning', label: 'Learning' },
];

interface RowData {
  id: number;
  taskId: string;
  taskTitle: string;
  project: string;
  percentage: string;
  status: string;
  types: string;
  hour: string;
}

const ReportAddPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [rows, setRows] = useState<RowData[]>([]);

  const addNewRow = () => {
    const newRow = {
      id: rows.length + 1,
      taskId: '',
      taskTitle: '',
      project: '',
      percentage: '',
      status: '',
      types: '',
      hour: '',
    };

    setRows([...rows, newRow]);
  };

  const removeRow = (id: any) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, sortable: false, disableColumnMenu: true },
    {
      field: 'taskId',
      headerName: 'Task ID',
      width: 130,
      renderCell: (params) => (
        <form>
          <Controller
            name={`${params.row.id}.taskId`}
            control={control}
            defaultValue={params.row.taskId}
            render={({ field }) => (
              <>
                <TextField {...field} variant="outlined" fullWidth />
              </>
            )}
          />
        </form>
      ),
    },
    {
      field: 'taskTitle',
      headerName: 'Task Title',
      width: 130,
      renderCell: (params) => (
        <form>
          <Controller
            name={`${params.row.id}.taskTitle`}
            control={control}
            defaultValue={params.row.taskTitle}
            render={({ field }) => (
              <>
                <TextField {...field} variant="outlined" fullWidth />
              </>
            )}
          />
        </form>
      ),
    },
    {
      field: 'project',
      headerName: 'Project',
      width: 90,
      renderCell: (params) => (
        <form>
          <Controller
            name={`${params.row.id}.project`}
            control={control}
            defaultValue={params.row.project}
            render={({ field }) => (
              <>
                <TextField {...field} variant="outlined" fullWidth />
              </>
            )}
          />
        </form>
      ),
    },
    {
      field: 'percentage',
      headerName: 'Percentage',
      type: 'number',
      width: 90,
      renderCell: (params) => (
        <form>
          <Controller
            name={`${params.row.id}.percentage`}
            control={control}
            defaultValue={params.row.percentage}
            render={({ field }) => (
              <>
                <TextField {...field} type="number" variant="outlined" fullWidth />
              </>
            )}
          />
        </form>
      ),
    },
    {
      field: 'types',
      headerName: 'Types',
      width: 90,
      renderCell: (params) => (
        <form>
          <Controller
            name={`${params.row.id}.types`}
            control={control}
            defaultValue={params.row.types}
            render={({ field }) => (
              <>
                <Select {...field}>
                  {typesOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
          />
        </form>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 90,
      renderCell: (params) => (
        <form>
          <Controller
            name={`${params.row.id}.status` as keyof RowData}
            control={control}
            defaultValue={params.row.status}
            render={({ field }) => (
              <>
                <TextField {...field} variant="outlined" fullWidth />
              </>
            )}
          />
        </form>
      ),
    },
    {
      field: 'hour',
      headerName: 'Hour',
      type: 'number',
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <form>
          <Controller
            name={`${params.row.id}.hour`}
            control={control}
            defaultValue={params.row.hour}
            render={({ field }) => (
              <>
                <TextField {...field} type="number" variant="outlined" fullWidth />
              </>
            )}
          />
        </form>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button variant="outlined" color="error" onClick={() => removeRow(params.row.id)}>
          Remove
        </Button>
      ),
    },
  ];

  const onSubmit = () => {
    console.log(rows);
  };

  return (
    <Paper sx={{ height: 400, width: '100%', backgroundColor: palette.common.white }}>
      <Button onClick={addNewRow} variant="contained" color="primary">
        Add Row
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={false}
        />
        <Button type="submit" variant="contained" color="primary" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default ReportAddPage;
