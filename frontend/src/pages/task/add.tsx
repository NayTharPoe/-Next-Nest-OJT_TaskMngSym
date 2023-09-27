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
import React, { ReactElement, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import palette from "@/theme/palette";
import { DatePicker } from "@mui/x-date-pickers";
import { useRouter } from "next/router";

const TaskCreate = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any): void => {
    console.log(data);
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

  return (
    <>
      <Box sx={{ width: { md: "70%", sm: "80%" }, margin: "0 auto" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item md={6} sm={6} xs={12}>
              <InputLabel>
                Project <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="project"
                rules={{ required: "Project is required" }}
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      fullWidth
                      id="project"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      error={!!errors.project}
                    >
                      <MenuItem value="0">project01</MenuItem>
                      <MenuItem value="1">project02</MenuItem>
                      <MenuItem value="2">project03</MenuItem>
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
                name="employee"
                rules={{ required: "Assign employee is required" }}
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="employee"
                      value={field.value}
                      placeholder="Assign Employee"
                      onChange={(e) => field.onChange(e.target.value)}
                      fullWidth
                    >
                      <MenuItem value="0">james</MenuItem>
                      <MenuItem value="1">john</MenuItem>
                      <MenuItem value="2">mgmg</MenuItem>
                    </Select>
                    <FormHelperText error>
                      {errors.employee?.message as string}
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
              <InputLabel>Estimate Start</InputLabel>
              <Controller
                name="estimateStart"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      {...field}
                      value={field.value || null}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>Estimate Finish</InputLabel>
              <Controller
                name="estimateFinish"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      {...field}
                      value={field.value || null}
                      onChange={(date) => {
                        field.onChange(date);
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
      </Box>
    </>
  );
};

TaskCreate.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default TaskCreate;
