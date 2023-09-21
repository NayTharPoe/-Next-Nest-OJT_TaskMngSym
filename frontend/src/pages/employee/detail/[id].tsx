import MainLayout from "@/layouts/MainLayout";
import {
  Box,
  Grid,
  InputLabel,
  Stack,
  TextField,
  CardMedia,
  Select,
  Button,
  MenuItem,
} from "@mui/material";
import React, { ReactElement, useState } from "react";
import palette from "@/theme/palette";
import { useRouter } from "next/router";

const EmployeeDetail = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<number | null>(0);

  const router = useRouter();

  const CancelButton = (props: any) => {
    return (
      <Button
        fullWidth
        variant="contained"
        sx={{
          padding: "10px",
          borderRadius: ".5rem",
          boxShadow: "none",
          background: palette.secondary.main,
          color: palette.text.primary,
          "&:hover": {
            background: palette.secondary.main,
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
        <Grid container spacing={4}>
          <Grid item md={6} sm={6} xs={12}>
            <InputLabel>Name</InputLabel>
            <TextField disabled fullWidth placeholder="Employee Name..." />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <InputLabel>Email</InputLabel>
            <TextField disabled fullWidth placeholder="Email..." />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                border: "1px solid #b0afaf",
                borderRadius: "6px",
                width: "48%",
                "@media (max-width: 600px)": { width: "65%" },
              }}
            >
              <CardMedia
                component="img"
                alt="img-upload"
                src="https://img.freepik.com/free-photo/cute-dog-studio_23-2150687309.jpg?size=626&ext=jpg&ga=GA1.1.988097705.1691639176&semt=sph"
                sx={{
                  width: "100%",
                  height: "170px",
                  borderRadius: "5px",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputLabel>Address</InputLabel>
            <TextField disabled fullWidth placeholder="Address..." />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputLabel>Phone</InputLabel>
            <TextField disabled fullWidth placeholder="Phone..." />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputLabel>DOB</InputLabel>
            <TextField disabled fullWidth placeholder="DOB..." />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputLabel>Position</InputLabel>
            {/* <TextField fullWidth placeholder="Position..." /> */}
            <Select
              disabled
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value as number)}
              fullWidth
            >
              <MenuItem value="0">Member</MenuItem>
              <MenuItem value="1">Admin</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Stack
          mt={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          direction={"column"}
        >
          <CancelButton onClick={() => router.push("/employee/list")}>
            Cancel
          </CancelButton>
        </Stack>
      </Box>
    </>
  );
};

EmployeeDetail.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default EmployeeDetail;
