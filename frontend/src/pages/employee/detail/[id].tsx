import React, { ReactElement, useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CardBtn from "@/components/cardBtn";
import palette from "@/theme/palette";
import HomeIcon from "@mui/icons-material/Home";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useRouter } from "next/router";
import { apiClient } from "@/services/apiClient";
import Loading from "@/components/loading";
import config from "@/config";

const EmployeeList = () => {
  const router = useRouter();

  const [employeeData, setEmployeeData] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (router.query?.id) {
      apiClient
        .get(`${config.SERVER_DOMAIN}/employee/detail/${router.query.id}`)
        .then((res) => {
          setEmployeeData(res.data.data);
          setIsLoading(false);
        });
    }
  }, [router.query.id]);

  return (
    <>
      {isLoading && <Loading />}
      <Grid
        mt={2}
        container
        spacing={5}
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Grid item>
          <Card
            sx={{
              "&:hover .del-icon": {
                opacity: 1,
              },
              background: "#fbfbfb",
              width: "340px",
              borderRadius: "20px",
              "@media (min-width: 320px) and (max-width: 450px)": {
                width: "270px",
              },
            }}
          >
            <Avatar
              sx={{
                width: 60,
                height: 60,
                margin: "30px auto 0",
              }}
              alt="img"
              src={employeeData?.profile}
            />
            <Box
              mt={1}
              sx={{
                textAlign: "center",
                color: (theme) => `${theme.palette.text.secondary}`,
              }}
            >
              <Typography>{employeeData?.employeeName}</Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Admin
              </Typography>
              <Button
                sx={{
                  background: "transparent",
                  border: `1px solid ${
                    employeeData?.verified
                      ? palette.info.light
                      : palette.error.lighter
                  }`,
                  color: `${
                    employeeData?.verified
                      ? palette.info.main
                      : palette.error.main
                  }`,
                  textTransform: "uppercase",
                  marginTop: "4px",
                  fontSize: "12px",
                  boxShadow: "none",
                  borderRadius: "20px",
                  padding: "3px 15px",
                  pointerEvents: "none",
                }}
                variant="contained"
              >
                {employeeData.verified ? "Verified" : "Not Verified"}
              </Button>
            </Box>
            <CardContent>
              <Stack
                sx={{
                  borderRadius: "15px",
                  padding: "15px",
                  color: (theme) => `${theme.palette.text.secondary}`,
                  marginBottom: "10px",
                  backgroundColor: palette.primary.lighter,
                }}
                spacing={1}
              >
                <Typography
                  noWrap
                  style={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <EmailIcon sx={{ marginRight: "5px", fontSize: "20px" }} />{" "}
                  {employeeData?.email}
                </Typography>
                <Typography
                  style={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PhoneIcon style={{ fontSize: "20px", marginRight: "5px" }} />{" "}
                  {employeeData?.phone ? employeeData.phone : "..."}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  borderRadius: "15px",
                  padding: "15px",
                  color: (theme) => `${theme.palette.text.secondary}`,
                  marginBottom: "10px",
                  backgroundColor: palette.primary.lighter,
                }}
                spacing={1}
              >
                <Typography
                  noWrap
                  style={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <HomeIcon sx={{ marginRight: "5px", fontSize: "20px" }} />{" "}
                  {employeeData?.address ? employeeData.address : "..."}
                </Typography>
                <Typography
                  style={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PermContactCalendarIcon
                    style={{ fontSize: "20px", marginRight: "5px" }}
                  />{" "}
                  {employeeData?.dob ? employeeData.dob : "..."}
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                mt={2}
              >
                <CardBtn
                  onClick={() =>
                    router.push(`/employee/edit/${employeeData._id}`)
                  }
                  text="Edit"
                >
                  Edit
                </CardBtn>
                <CardBtn
                  onClick={() => router.push(`/employee/list`)}
                  text="Cancel"
                >
                  Cancel
                </CardBtn>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

EmployeeList.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default EmployeeList;
