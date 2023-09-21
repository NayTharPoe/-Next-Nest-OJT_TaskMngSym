import React, { ReactElement, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

interface Task {
  taskId: string;
  taskTitle: string;
  project: string;
  percentage: string;
  type: string;
  status: string;
  hour: string;
}

const ReportAddPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    taskId: '',
    taskTitle: '',
    project: '',
    percentage: '',
    type: '',
    status: '',
    hour: '',
  });

  const handleAddTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask({
      taskId: '',
      taskTitle: '',
      project: '',
      percentage: '',
      type: '',
      status: '',
      hour: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name as string]: value as string,
    });
  };

  return (
    <div>
      <Button onClick={handleAddTask} variant="contained" color="primary">
        Add Task
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task ID</TableCell>
              <TableCell>Task Title</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Percentage</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Hour</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell>
                  <FormControl>
                    <TextField name="taskId" value={task.taskId} onChange={handleInputChange} />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl>
                    <TextField name="taskTitle" value={task.taskTitle} onChange={handleInputChange} />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl>
                    <TextField name="project" value={task.project} onChange={handleInputChange} />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl>
                    <TextField name="percentage" value={task.percentage} onChange={handleInputChange} />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl>
                    <InputLabel>Type</InputLabel>
                    <Select
                      name="type"
                      value={task.type}
                      onChange={(e, child) => handleSelectChange(e, child)}
                    >
                      <MenuItem value="Type 1">Type 1</MenuItem>
                      <MenuItem value="Type 2">Type 2</MenuItem>
                      <MenuItem value="Type 3">Type 3</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={task.status}
                      onChange={(e, child) => handleSelectChange(e, child)}
                    >
                      <MenuItem value="Status 1">Status 1</MenuItem>
                      <MenuItem value="Status 2">Status 2</MenuItem>
                      <MenuItem value="Status 3">Status 3</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl>
                    <TextField name="hour" value={task.hour} onChange={handleInputChange} />
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReportAddPage;

ReportAddPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
