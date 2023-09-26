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
import AddIcon from "@mui/icons-material/Add";
import AddNewBtn from "@/components/addNewBtn";
import CardBtn from "@/components/cardBtn";
import palette from "@/theme/palette";
import EmployeeSearchBox from "@/components/employee-search-input";
import { useRouter } from "next/router";
import { theme } from "@/theme";
import axios from "axios";
import useSWR from "swr";
import ConfirmDialog from "@/components/commonDialog";

const EmployeeList = () => {
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [onClose, setOnClose] = useState(false);
  const [employeeList, setEmployeeList] = useState<any>([]);

  const fetcher = async () => {
    const res = await axios.get("http://localhost:8080/employees/list");
    setEmployeeList(res.data.data);
    return res;
  };

  const { data, error, isLoading } = useSWR("/employees/list", fetcher);

  const router = useRouter();

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:8080/employee/${id}`);
    setEmployeeList((prevList: any) =>
      prevList?.filter((row: any) => row._id !== id)
    );
    setOpen(false);
  };

  const handleInputChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const filterEmployeeData = employeeList?.filter((row: any) => {
    const { email, employeeName } = row;
    return (
      email
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase().trim()) ||
      employeeName
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase().trim())
    );
  });

  const AddButton = (props: any) => {
    return (
      <Button
        fullWidth
        variant="contained"
        sx={{
          padding: "10px 15px",
          // borderRadius: ".5rem",
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
        <Box sx={{ marginTop: { xs: "20px" } }}>
          <EmployeeSearchBox
            value={searchText}
            inputSearch={handleInputChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: { xs: "100%", sm: "auto" },
            mt: 2,
          }}
        >
          <AddButton onClick={() => router.push("/employee/add")}>
            <AddIcon fontSize="small" sx={{ mr: 1 }} /> New Employee
          </AddButton>
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
        {filterEmployeeData?.map((row: any) => {
          return (
            <Grid key={row._id} item>
              <Card
                sx={{
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
                  <IconButton onClick={() => setOpen(true)}>
                    <DeleteIcon
                      sx={{
                        color: (theme) => `${theme.palette.text.secondary}`,
                      }}
                    />
                  </IconButton>
                  <ConfirmDialog
                    open={open}
                    onClose={onClose}
                    onClick={() => handleDelete(row._id)}
                    onCancel={() => setOpen(false)}
                    id={row._id}
                  />
                </div>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    margin: "0 auto",
                  }}
                  alt="img"
                  src={row.profile}
                />
                <Box
                  mt={1}
                  sx={{
                    textAlign: "center",
                    color: (theme) => `${theme.palette.text.secondary}`,
                  }}
                >
                  <Typography>{row.employeeName}</Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    {row.position === "0" ? "Member" : "Admin"}
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
                      {row.phone ? row.phone : "..."}
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
                      onClick={() => router.push(`/employee/edit/${row._id}`)}
                      text="Edit"
                    >
                      Edit
                    </CardBtn>
                    <CardBtn
                      onClick={() => router.push(`/employee/detail/${row._id}`)}
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
