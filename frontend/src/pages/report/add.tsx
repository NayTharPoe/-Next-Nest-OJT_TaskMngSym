import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import {
  Paper,
  Box,
  Button,
  InputAdornment,
  MenuItem,
  TextField,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Dialog,
  DialogContentText,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import palette from '@/theme/palette';
import dayjs from 'dayjs';
import axios from 'axios';

const PreviewDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: 365,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const CommonDialog = ({ open, onClose, title, contentText }: any) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="common-dialog-title"
      aria-describedby="common-dialog-description"
    >
      <DialogTitle id="common-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="common-dialog-description">{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

type FormValues = {
  report: {
    taskId: string;
    taskTitle: string;
    project: string;
    percentage: number | string;
    types: string;
    status: string;
    hours: number | string;
  }[];
};

const statusOptions = [
  { value: 0, label: 'Open' },
  { value: 1, label: 'In Progress' },
  { value: 2, label: 'Finish' },
  { value: 3, label: 'Close' },
];

const typeOptions = [
  { value: 'Coding', label: 'Coding' },
  { value: 'Learning', label: 'Learning' },
  { value: 'Review', label: 'Review' },
  { value: 'Bugfix', label: 'Bugfix' },
  { value: 'Testing', label: 'Testing' },
];

const detailTaskIdOptions = [
  { taskId: 'T001', taskTitle: 'T001 task title', project: { projectName: 'T001 project' } },
  { taskId: 'T002', taskTitle: 'T002 task title', project: { projectName: 'T002 project' } },
  { taskId: 'T003', taskTitle: 'T003 task title', project: { projectName: 'T003 project' } },
  { taskId: 'T004', taskTitle: 'T004 task title', project: { projectName: 'T004 project' } },
  { taskId: 'T005', taskTitle: 'T005 task title', project: { projectName: 'T005 project' } },
];

interface Column {
  id: 'id' | 'taskId' | 'taskTitle' | 'project' | 'percentage' | 'types' | 'status' | 'hours' | 'action';
  label: string;
  minWidth?: number;
  align?: 'justify' | 'left' | 'center' | 'right' | 'inherit';
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 40, align: 'left' },
  { id: 'taskId', label: 'Task ID', minWidth: 130, align: 'left' },
  { id: 'taskTitle', label: 'Task Title', minWidth: 140, align: 'left' },
  { id: 'project', label: 'Project', minWidth: 140, align: 'left' },
  { id: 'types', label: 'Types', minWidth: 170, align: 'left' },
  { id: 'status', label: 'Status', minWidth: 170, align: 'left' },
  { id: 'percentage', label: 'Percentage', minWidth: 170, align: 'left' },
  { id: 'hours', label: 'Hours', minWidth: 140, align: 'left' },
  { id: 'action', label: 'Action', minWidth: 140, align: 'left' },
];

const schema = yup.object().shape({
  reportTo: yup.string().required('Please select an admin.'),
  problem_feeling: yup.string(),
  reports: yup.array().of(
    yup.object().shape({
      taskId: yup.string().required('Task ID is required.'),
      taskTitle: yup.string().required('Task title is required.'),
      project: yup.string().required('Project is required.'),
      percentage: yup
        .number()
        .typeError('Percentage must be a number')
        .min(0, 'percentage must be greater than or equal to 0')
        .max(100, 'percentage must be less than or equal to 100')
        .required('Percentage is required.'),
      types: yup.string().required('Types is required.'),
      status: yup.string().required('Status is required.'),
      hours: yup
        .number()
        .typeError('Hours must be a number')
        .min(0, 'hours must be greater than or equal to 0')
        .max(8, 'hours must be less than or equal to 8')
        .required('Hours is required'),
    })
  ),
});

const ReportAddPage = () => {
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContentText, setDialogContentText] = useState('');
  const [roleOptions, setRoleOptions] = useState<{ value: string; label: string }[]>([]);
  const [taskOptions, setTaskOptions] = useState([]);
  const [selectedTaskIdData, setSelectedTaskIdData] = useState([]);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const showDialog = (title: string, contentText: string) => {
    setDialogTitle(title);
    setDialogContentText(contentText);
    setOpenDialog(true);
  };

  const handlePreviewOpen = () => {
    setOpenPreviewDialog(true);
  };

  const handlePreviewClose = () => {
    setOpenPreviewDialog(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reportTo: '',
      problem_feeling: '',
      reports: [
        {
          taskId: '',
          taskTitle: '',
          project: '',
          percentage: 0,
          types: '',
          status: '',
          hours: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'reports',
    control,
    rules: {
      required: 'Please add at least 1 report',
    },
  });

  const getTotalHour = (payload: FormValues['report']) => {
    let totalHour = 0;
    payload.forEach((item) => (totalHour += Number(item.hours)));
    return totalHour;
  };

  const previewAdmin = useWatch({ control, name: 'reportTo' });
  const previewProblem = useWatch({ control, name: 'problem_feeling' });
  const reportValues = useWatch({ control, name: 'reports' });
  const totalHour = getTotalHour(reportValues || []);

  const fetchRoles = async () => {
    try {
      const res = await axios
        .get('http://localhost:8080/employees/list?page=1&limit=1000')
        .then((res) => res.data);
      const adminRoles = res.data
        ?.filter((e: { position: string }) => e.position !== '1')
        .map((employee: any) => ({
          value: employee._id,
          label: employee.employeeName,
        }));
      setRoleOptions(adminRoles);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios
        .get('http://localhost:8080/tasks/list?page=1&limit=1000')
        .then((res) => res.data);
      const taskOptions = res.data?.map((task: { _id: any }, index: number) => ({
        value: task._id,
        label: index + 1,
      }));

      const selectedTaskData = res.data?.map((task: any) => ({
        key: task._id,
        taskTitle: task?.title,
        project: task.project?.projectName,
      }));

      setTaskOptions(taskOptions);
      setSelectedTaskIdData(selectedTaskData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeTask = (e: any, index: any) => {
    const selectedTaskId = e.target.value;
    const selectedTask: any = selectedTaskIdData.find((task: any) => task.key === selectedTaskId);

    // Update the values for the specific row at the given index
    if (selectedTask) {
      const updatedSelectedTaskIds: any = [...selectedTaskIds];
      updatedSelectedTaskIds[index] = selectedTaskId;
      setSelectedTaskIds(updatedSelectedTaskIds);

      setValue(`reports.${index}.taskId`, selectedTaskId);
      setValue(`reports.${index}.taskTitle`, selectedTask.taskTitle);
      setValue(`reports.${index}.project`, selectedTask.project);
    }
  };

  const onSubmit = async (data: any) => {
    console.log('data', data);
    const reportByRawData = {
      employeeName: 'ME ME ME',
      profile:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROI--23ZsZB50wGPBSL3U9wV4Gq83t5Xxh-w&usqp=CAU',
      position: '0',
    };

    if (fields.length <= 0) {
      showDialog('No Data', 'Please add at least 1 report.');
    } else if (Object.keys(errors).length) {
      return;
    } else if (totalHour !== 8) {
      showDialog('Total Hours Limitations', 'Total hours must be 8 hours.');
    } else {
      showDialog('Successful Submission', 'Your report has been added successfully');
      const payload = data.reports?.map((row: any) => ({
        ...row,
        status: Number(row.status),
        reportTo: roleOptions.find((option) => option.value === data.reportTo)?.label,
        reportBy: reportByRawData,
        problemFeeling: data.problem_feeling,
      }));

      console.log('this is payload', payload);

      try {
        const res = await axios.post('http://localhost:8080/report/add', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchTasks();
  }, []);

  return (
    <Box sx={{ mt: 5 }}>
      <form>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Controller
            control={control}
            name="reportTo"
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ''}
                id="role"
                select
                label="Report To"
                error={!!errors.reportTo}
                helperText={errors.reportTo?.message}
                sx={{ width: 120 }}
              >
                {roleOptions.map((option: any) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Button
            onClick={() =>
              append({
                taskId: '',
                taskTitle: '',
                project: '',
                percentage: 0,
                types: '',
                status: '',
                hours: 0,
              })
            }
          >
            Add Report
          </Button>
        </Box>
      </form>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper
          sx={{
            backgroundColor: palette.common.white,
            width: '100%',
            overflow: 'hidden',
            borderRadius: '.7rem',
            my: 4,
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((field, index) => {
                  return (
                    <TableRow key={field.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Controller
                          name={`reports.${index}.taskId`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="taskId"
                              value={selectedTaskIds[index] || ''}
                              select
                              label="Task ID"
                              fullWidth
                              error={!!errors.reports?.[index]?.taskId}
                              helperText={errors.reports?.[index]?.taskId?.message}
                              onChange={(e) => handleChangeTask(e, index)}
                            >
                              {taskOptions?.map((option: any) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                        />
                      </TableCell>

                      <TableCell>
                        <Controller
                          name={`reports.${index}.taskTitle`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Task Title"
                              id="taskTitle"
                              sx={{ m: 1, width: '25ch' }}
                              disabled
                              error={!!errors.reports?.[index]?.taskTitle}
                              helperText={errors.reports?.[index]?.taskTitle?.message}
                            />
                          )}
                        />
                      </TableCell>

                      <TableCell>
                        <Controller
                          name={`reports.${index}.project`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Project"
                              id="project"
                              sx={{ m: 1, width: '25ch' }}
                              disabled
                              error={!!errors.reports?.[index]?.project}
                              helperText={errors.reports?.[index]?.project?.message}
                            />
                          )}
                        />
                      </TableCell>

                      <TableCell>
                        <Controller
                          name={`reports.${index}.types`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="types"
                              select
                              label="Types"
                              fullWidth
                              error={!!errors.reports?.[index]?.types}
                              helperText={errors.reports?.[index]?.types?.message}
                            >
                              {typeOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                        />
                      </TableCell>

                      <TableCell>
                        <Controller
                          name={`reports.${index}.status`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="status"
                              select
                              label="Status"
                              fullWidth
                              error={!!errors.reports?.[index]?.status}
                              helperText={errors.reports?.[index]?.status?.message}
                            >
                              {statusOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                        />
                      </TableCell>

                      <TableCell>
                        <Controller
                          name={`reports.${index}.percentage`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Percentage"
                              id="percentage"
                              value={field.value}
                              type="number"
                              sx={{ m: 1, width: '25ch' }}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                              }}
                              error={!!errors.reports?.[index]?.percentage}
                              helperText={errors.reports?.[index]?.percentage?.message}
                            />
                          )}
                        />
                      </TableCell>

                      <TableCell>
                        <Controller
                          name={`reports.${index}.hours`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Hours"
                              id="hours"
                              type="number"
                              value={field.value}
                              sx={{ m: 1, width: '25ch' }}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">hour</InputAdornment>,
                              }}
                              error={!!errors.reports?.[index]?.hours}
                              helperText={errors.reports?.[index]?.hours?.message}
                            />
                          )}
                        />
                      </TableCell>

                      <TableCell>
                        <Button onClick={() => remove(index)}>Remove</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Box>
          <Controller
            control={control}
            name="problem_feeling"
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ''}
                id="problem-feeling"
                label="Problem and Feeling"
                multiline
                rows={5}
                sx={{ width: 320 }}
              />
            )}
          />
        </Box>

        <Box>{errors.reports?.root?.message}</Box>

        <CommonDialog
          open={openDialog}
          onClose={handleDialogClose}
          title={dialogTitle}
          contentText={dialogContentText}
        />

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Button type="submit" onClick={onSubmit}>
            Submit
          </Button>
          <Button onClick={handlePreviewOpen}>Preview</Button>
        </Box>

        {/* preview dialog */}
        <PreviewDialog
          onClose={handlePreviewClose}
          aria-labelledby="customized-dialog-title"
          open={openPreviewDialog}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Reports Preview
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handlePreviewClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme: any) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography>
              Report To :{' '}
              <span className="fw-600">
                {roleOptions.find((row: any) => row.value === previewAdmin)?.label}
              </span>
            </Typography>
            <Typography>
              Date : <span className="fw-600">{dayjs(new Date()).format('YYYY-MM-DD')}</span>
            </Typography>
            <Typography>
              Name : <span className="fw-600">Admin</span>
            </Typography>
            <Typography>
              Projects :{' '}
              {reportValues?.map((row, index) => (
                <span key={index}>{row.project},</span>
              ))}
            </Typography>
            <Typography>【実績】</Typography>
            {reportValues?.map((row, index) => (
              <Box key={index}>
                <Typography>
                  - {row.taskTitle}, &lt;{row.percentage}%&gt;, &lt;{row.types}&gt;, &lt;
                  {statusOptions.find((option) => option.value.toString() === row.status.toString())?.label}
                  &gt;, &lt;{row.hours}Hours&gt;
                </Typography>
              </Box>
            ))}
            <Typography>【実績】</Typography>
            <Typography>
              {' '}
              Problem, Feeling - <span>{previewProblem || 'Nothing'}</span>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus type="submit" onClick={() => setOpenPreviewDialog(false)}>
              Cancel
            </Button>
          </DialogActions>
        </PreviewDialog>
      </form>
    </Box>
  );
};

export default ReportAddPage;
ReportAddPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
