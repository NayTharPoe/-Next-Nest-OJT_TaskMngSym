import MainLayout from "@/layouts/MainLayout";
import {
  Box,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  FormControl,
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import palette from "@/theme/palette";
import { DatePicker } from "@mui/x-date-pickers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { TaskAddSchema } from "@/utils/taskValidate";
import AuthDialog from "@/components/authDialog";
import Loading from "@/components/loading";
import { apiClient } from "@/services/apiClient";
import config from "@/config";

const TaskCreate = () => {
  const [selectProject, setSelectProject] = useState([]);
  const [selectEmployee, setSelectEmployee] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [statusText, setStatusText] = useState("");
  const [currentUserData, setCurrentUserData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const projectApi = await apiClient.get(
        `${config.SERVER_DOMAIN}/projects/list?page=1&limit=100`
      );
      const employeeApi = await apiClient.get(
        `${config.SERVER_DOMAIN}/employees/list?page=1&limit=100`
      );
      setSelectProject(
        projectApi.data.data.map((project: any) => ({
          value: project._id,
          label: project.projectName,
        }))
      );
      setSelectEmployee(
        employeeApi.data.data.map((employee: any) => ({
          value: employee._id,
          label: employee.employeeName,
        }))
      );
    };
    fetchData();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TaskAddSchema),
  });

  const onSubmit = (data: any): void => {
    setIsLoading(true);
    const result = {
      ...data,
      estimateHour: Number(data.estimateHour),
      status: data.status ? data.status : "0",
      estimate_start_date: data.estimate_start_date
        ? dayjs(data.estimate_start_date).format("MM-DD-YYYY")
        : "",
      estimate_finish_date: data.estimate_finish_date
        ? dayjs(data.estimate_finish_date).format("MM-DD-YYYY")
        : "",
    };
    apiClient
      .post(`${config.SERVER_DOMAIN}/task/add`, result)
      .then((res) => {
        setOpen(true);
        setIsLoading(false);
        setStatusText(res.statusText);
        setMessage(res.data?.message);
      })
      .catch((err) => {
        setOpen(true);
        setIsLoading(false);
        setMessage(err.response?.data.message);
      });
  };

  const handleClose = () => {
    setOpen(false);
    if (statusText === "OK") {
      router.push("/task/list");
    }
  };

  const CommonButton = (props: any) => {
    return (
      <Button
        fullWidth
        type={props.text === "save" ? "submit" : "button"}
        variant="contained"
        sx={{
          padding: "10px",
          borderRadius: ".5rem",
          boxShadow: "none",
          background: `${
            props.text === "save"
              ? palette.primary.main
              : palette.secondary.main
          }`,
          color: palette.text.primary,
          "&:hover": {
            backgroundColor: `${
              props.text === "save"
                ? palette.primary.main
                : palette.secondary.main
            }`,
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

  useEffect(() => {
    setCurrentUserData(JSON.parse(localStorage.getItem("user") ?? "{}"));
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Box sx={{ width: { md: "70%", sm: "80%" }, margin: "0 auto" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item md={6} sm={6} xs={12}>
              <InputLabel>
                Project <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="project"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      fullWidth
                      id="project"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      error={!!errors.project}
                    >
                      {selectProject.map((option: any) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error>
                      {errors.project?.message as string}
                    </FormHelperText>
                  </>
                )}
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <InputLabel>
                Assign Employee <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="assignedEmployee"
                rules={{ required: "Assign employee is required" }}
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="assignedEmployee"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      error={!!errors.assignedEmployee}
                      fullWidth
                    >
                      {selectEmployee.map((option: any) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error>
                      {errors.assignedEmployee?.message as string}
                    </FormHelperText>
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Description</InputLabel>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="description"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    fullWidth
                    placeholder="description..."
                  />
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>
                Title <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="title"
                rules={{ required: "Title is required" }}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="title"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    error={!!errors.title}
                    helperText={errors.title?.message as string}
                    fullWidth
                    placeholder="title..."
                  />
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>
                Estimate Hour <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="estimateHour"
                rules={{ required: "Estimate hour is required" }}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="estimateHour"
                    type="number"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    fullWidth
                    placeholder="Estimate Hour..."
                    error={!!errors.estimateHour}
                    helperText={errors.estimateHour?.message as string}
                  />
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>
                Estimate Start <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="estimate_start_date"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      {...field}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(date?.toDate());
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: !!errors.estimate_start_date,
                          helperText: errors.estimate_start_date?.message,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>
                Estimate Finish <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="estimate_finish_date"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      {...field}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(date?.toDate());
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: !!errors.estimate_finish_date,
                          helperText: errors.estimate_finish_date?.message,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
          </Grid>
          <Stack
            mt={3}
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 4 }}
          >
            <CommonButton onClick={() => router.push("/task/list")}>
              Cancel
            </CommonButton>
            <CommonButton text="save">Save</CommonButton>
          </Stack>
        </form>
        <AuthDialog statusText={statusText} open={open} close={handleClose}>
          {message}
        </AuthDialog>
      </Box>
    </>
  );
};

TaskCreate.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default TaskCreate;
