import React, { ReactElement, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import AddNewBtn from "@/components/addNewBtn";
import CardBtn from "@/components/cardBtn";
import palette from "@/theme/palette";
import EmployeeSearchBox from "@/components/employee-search-input";
import { useRouter } from "next/router";
import { theme } from "@/theme";

const EmployeeList = () => {
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const handleInputChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const employee = [
    {
      id: 1,
      email: "mtm.linnaunghtet@gmail.com",
      phone: "09800900700",
      birthDate: "2023-56-90",
      verified: true,
      appliedOn: "2023-09-89",
    },
    {
      id: 2,
      email: "james@gmail.com",
      phone: "09800900700",
      birthDate: "2023-56-90",
      verified: false,
      appliedOn: "2023-09-89",
    },
    {
      id: 3,
      email: "james@gmail.com",
      phone: "09800900700",
      birthDate: "2023-56-90",
      verified: true,
      appliedOn: "2023-09-89",
    },
    {
      id: 4,
      email: "james@gmail.com",
      phone: "09800900700",
      birthDate: "2023-56-90",
      verified: false,
      appliedOn: "2023-09-89",
    },
  ];

  const filterEmployeeData = employee.filter((row) => {
    const { email, phone } = row;
    return (
      email
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase().trim()) ||
      phone.toLocaleLowerCase().includes(searchText.toLocaleLowerCase().trim())
    );
  });

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          [theme.breakpoints.up("sm")]: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          },
          [theme.breakpoints.down("sm")]: {
            display: "flex",
            flexDirection: "column-reverse",
          },
        }}
      >
        <Box sx={{ width: { xs: "60%" }, marginTop: { xs: "20px" } }}>
          <EmployeeSearchBox
            value={searchText}
            inputSearch={handleInputChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <AddNewBtn AddNewBtnText="Add New Employee" path={"/employee/add"} />
        </Box>
      </Stack>
      <Grid
        mt={2}
        container
        spacing={5}
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {filterEmployeeData.map((row) => {
          return (
            <Grid key={row.id} item>
              <Card
                sx={{
                  "&:hover .del-icon": {
                    opacity: 1,
                  },
                  background: "#fbfbfb",
                  width: "250px",
                  borderRadius: "20px",
                  "@media (min-width: 320px)": {
                    width: "250px",
                  },
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    padding: "5px 8px 0",
                  }}
                >
                  <IconButton>
                    <DeleteIcon
                      sx={{
                        color: (theme) => `${theme.palette.text.secondary}`,
                      }}
                      className="del-icon"
                    />
                  </IconButton>
                </div>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    margin: "0 auto",
                  }}
                  alt="img"
                  src="https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_default.jpg"
                />
                <Box
                  mt={1}
                  sx={{
                    textAlign: "center",
                    color: (theme) => `${theme.palette.text.secondary}`,
                  }}
                >
                  <Typography>Linn Aung Htet</Typography>
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
                        row.verified
                          ? palette.info.light
                          : palette.error.lighter
                      }`,
                      color: `${
                        row.verified ? palette.info.main : palette.error.main
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
                    {row.verified ? "Verified" : "Not Verified"}
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
                      <EmailIcon
                        sx={{ marginRight: "5px", fontSize: "20px" }}
                      />{" "}
                      {row.email}
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <PhoneIcon
                        style={{ fontSize: "20px", marginRight: "5px" }}
                      />{" "}
                      {row.phone}
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
                      onClick={() => router.push(`/employee/edit/${row.id}`)}
                      text="Edit"
                    >
                      Edit
                    </CardBtn>
                    <CardBtn
                      onClick={() => router.push(`/employee/detail/${row.id}`)}
                      text="View"
                    >
                      View
                    </CardBtn>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

EmployeeList.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default EmployeeList;
