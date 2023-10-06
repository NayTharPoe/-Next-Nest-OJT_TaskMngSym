import MainLayout from "@/layouts/MainLayout";
import {
  Box,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
  CardMedia,
  Select,
  Button,
  MenuItem,
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import BackupIcon from "@mui/icons-material/Backup";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import palette from "@/theme/palette";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import Loading from "@/components/loading";
import AuthDialog from "@/components/authDialog";
import { apiClient } from "@/services/apiClient";
import config from "@/config";

const EmployeeEdit = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<any>(null);
  const [editUploadImg, setEditUploadImg] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [statusText, setStatusText] = useState("");

  const router = useRouter();
  const {
    query: { id },
  } = router;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setIsLoading(true);
    if (router.query?.id) {
      apiClient
        .get(`${config.SERVER_DOMAIN}/employee/detail/${id}`)
        .then((res) => {
          setValue("employeeName", res.data.data.employeeName);
          setValue("email", res.data.data.email);
          setValue("address", res.data.data.address);
          setValue("phone", res.data.data.phone);
          setUploadedImage(res.data.data.profile);
          setEditUploadImg(res.data.data.profile);
          setValue("dob", res.data.data.dob);
          setValue("position", res.data.data.position);
          setIsLoading(false);
        });
    }
  }, [router.query.id]);

  const onSubmit = (data: any) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("employeeName", data.employeeName);
    formData.append("email", data.email);
    formData.append("address", data.address ? data.address : "");
    formData.append("phone", data.phone ? data.phone : "");
    formData.append(
      "dob",
      data.dob ? dayjs(data.dob).format("MM/DD/YYYY") : ""
    );
    formData.append("position", data.position);
    if (uploadedPhoto) {
      formData.append("profile", uploadedPhoto);
    } else if (editUploadImg) {
      formData.append("profile", editUploadImg);
    } else {
      formData.append("profile", "");
    }
    apiClient
      .put(`${config.SERVER_DOMAIN}/employee/edit/${router.query.id}`, formData)
      .then((res) => {
        setOpen(true);
        setIsLoading(false);
        setStatusText(res.statusText);
        setMessage(res.data?.message);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          setOpen(true);
          setIsLoading(false);
          setMessage(err.message);
        } else {
          setOpen(true);
          setIsLoading(false);
          setMessage(err.response?.data.message);
        }
      });
  };

  const handleClose = () => {
    setOpen(false);
    if (statusText === "OK") {
      router.push("/employee/list");
    }
  };

  const disabledDate = (current: any) => {
    const todayDate = dayjs().startOf("day");
    const currentDate = dayjs(current).startOf("day");
    return currentDate.isAfter(todayDate);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    // Add any additional styling for drag over state
  };

  const handleDragLeave = () => {
    // Remove any additional styling for drag over state
  };

  const handleDrop = (e: any) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.match("image.*")) {
        const reader = new FileReader();

        reader.onload = () => {
          setUploadedImage(reader.result as string);
        };

        reader.readAsDataURL(file);
      } else {
        alert("Please select an image file (jpg, jpeg, png)");
      }
    }
  };

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    if (file.type.match("image.*")) {
      const reader = new FileReader();

      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setUploadedPhoto(file);
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please select an image file (jpg, jpeg, png)");
    }
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
    setUploadedPhoto("");
    setEditUploadImg(null);
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
      {isLoading && <Loading />}
      <Box sx={{ width: { md: "70%", sm: "80%" }, margin: "0 auto" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item md={6} sm={6} xs={12}>
              <InputLabel>
                Name <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="employeeName"
                rules={{ required: "Employee name is required" }}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="employeeName"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    error={!!errors.employeeName}
                    helperText={errors.employeeName?.message as string}
                    placeholder="Employee Name..."
                  />
                )}
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <InputLabel>
                Email <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="email"
                rules={{ required: "Email is required" }}
                control={control}
                render={({ field }) => (
                  <TextField
                    disabled
                    {...field}
                    fullWidth
                    id="email"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    error={!!errors.email}
                    helperText={errors.email?.message as string}
                    placeholder="Email..."
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Profile Photo</InputLabel>
              <Box
                sx={{
                  position: "relative",
                  width: "48%",
                  "@media (max-width: 600px)": { width: "65%" },
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {uploadedImage && (
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt="img-upload"
                      src={uploadedImage}
                      sx={{
                        width: "100%",
                        height: "170px",
                        display: "flex",
                        borderRadius: "5px",
                        justifyContent: "center",
                        objectFit: "cover",
                      }}
                    />
                    <DeleteIcon
                      onClick={handleDeleteImage}
                      sx={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        cursor: "pointer",
                        color: "#c33953",
                        background: "#e6dadaf0",
                        fontSize: "30px",
                      }}
                    />
                  </Box>
                )}
                {!uploadedImage && (
                  <input
                    id="file-input"
                    style={{ display: "none" }}
                    name="profile"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                  />
                )}
                <label
                  style={{
                    height: "170px",
                    width: "100%",
                    padding: "10px 15px",
                    borderRadius: "6px",
                    border: "1px solid #b0afaf",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                  htmlFor="file-input"
                >
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "20px",
                    }}
                  >
                    <BackupIcon sx={{ fontSize: "60px" }} />
                    <Typography>Choose a file or drag it here?</Typography>
                  </Box>
                </label>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>Address</InputLabel>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="address"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    fullWidth
                    placeholder="Address..."
                  />
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>Phone</InputLabel>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    id="phone"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    fullWidth
                    placeholder="Phone..."
                  />
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>DOB</InputLabel>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      {...field}
                      value={field.value ? dayjs(field.value) : null}
                      shouldDisableDate={disabledDate}
                      onChange={(date) => {
                        field.onChange(
                          date ? dayjs(date).format("MM/DD/YYYY") : null
                        );
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>
                Position <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Controller
                name="position"
                control={control}
                defaultValue="0"
                render={({ field }) => (
                  <Select
                    {...field}
                    id="position"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="0">Member</MenuItem>
                    <MenuItem value="1">Admin</MenuItem>
                  </Select>
                )}
              />
            </Grid>
          </Grid>
          <Stack
            mt={3}
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 4 }}
          >
            <CommonButton onClick={() => router.push("/employee/list")}>
              Cancel
            </CommonButton>
            <CommonButton text="save">Save</CommonButton>
            <AuthDialog statusText={statusText} open={open} close={handleClose}>
              {message}
            </AuthDialog>
          </Stack>
        </form>
      </Box>
    </>
  );
};

EmployeeEdit.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default EmployeeEdit;
