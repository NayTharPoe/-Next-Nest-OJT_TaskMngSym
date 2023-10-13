import React, { ReactElement, useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import palette from "@/theme/palette";
import EmployeeSearchBox from "@/components/employee-search-input";
import { useRouter } from "next/router";
import { theme } from "@/theme";
import ConfirmDialog from "@/components/commonDialog";
import { apiClient } from "@/services/apiClient";
import PaginationComponent from "@/components/pagination";
import CardBtn from "@/components/cardBtn";
import config from "@/config";

const EmployeeList = () => {
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [onClose, setOnClose] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [employeeList, setEmployeeList] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [employeeLength, setEmployeeLength] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [searchErr, setSearchErr] = useState("");

  const router = useRouter();

  useEffect(() => {
    apiClient
      .get(
        `${config.SERVER_DOMAIN}/employees/list?page=1&limit=100&keyword=${keyword}`
      )
      .then((res) => {
        setEmployeeLength(res.data.data.length);
        setSearchErr("");
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setSearchErr(err.response?.data.message);
          setEmployeeLength(0);
          setEmployeeList([]);
        }
      });
  }, [keyword, page, limit]);

  useEffect(() => {
    apiClient
      .get(
        `${config.SERVER_DOMAIN}/employees/list?page=${page}&limit=${limit}&keyword=${keyword}`
      )
      .then((res) => {
        setEmployeeList(res.data.data);
        setTotalEmployee(res.data.totalEmployee);
        setSearchErr("");
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setSearchErr(err.response?.data.message);
          setEmployeeList([]);
        }
      });
  }, [router, page, limit]);

  const handleDelete = () => {
    apiClient.delete(`${config.SERVER_DOMAIN}/employee/${deleteId}`);
    setEmployeeList((prevList: any) =>
      prevList?.filter((row: any) => row._id !== deleteId)
    );
    setOpen(false);
  };

  const handleInputChange = (event: any) => {
    setSearchText(event.target.value);
    setKeyword(event.target.value);
    setPage(1);
  };

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, employeeLength);

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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const currentQuery = { ...router.query };
    currentQuery.page = page.toString();
    currentQuery.limit = limit.toString();
    const newUrl = {
      pathname: router.pathname,
      query: currentQuery,
    };
    router.push(newUrl);
    setPage(page);
  };

  const handleLimitChange: any = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newLimit = event.target.value as number;
    setLimit(newLimit);

    const currentPathname = router.pathname;
    const currentQuery = { ...router.query };
    currentQuery.limit = newLimit.toString();
    currentQuery.page = "1";
    setPage(1);

    router.push({
      pathname: currentPathname,
      query: currentQuery,
    });
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
        {employeeList?.map((row: any) => {
          return (
            <Grid key={row._id} item>
              <Card
                sx={{
                  background: "#fbfbfb",
                  width: "300px",
                  borderRadius: "20px",
                  // "@media (min-width: 320px)": {
                  //   width: "255px",
                  // },
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    padding: "5px 8px 0",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      setOpen(true), setDeleteId(row._id);
                    }}
                  >
                    <DeleteIcon
                      sx={{
                        color: (theme) => `${theme.palette.text.secondary}`,
                      }}
                    />
                  </IconButton>
                  <ConfirmDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    onClick={handleDelete}
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
      {/* <Typography
        color="primary"
        variant="h4"
        sx={{ textAlign: "center", margin: "50px 0" }}
      >
        {searchErr}
      </Typography> */}
      {searchErr !== "" ? (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <img
            width={350}
            height={350}
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1696498646~exp=1696499246~hmac=c254d88ac3bfbc180427bd2cfce42cf18e0c8d77e8a7cdef35e370adbffa9f55"
            alt=""
          />
        </Typography>
      ) : (
        ""
      )}
      {/* {searchErr === "" ? ( */}
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            marginTop: "30px",
          }}
        >
          <Select
            value={limit}
            size="small"
            onChange={handleLimitChange}
            sx={{
              borderRadius: "4rem",
              backgroundColor: palette.common.white,
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: palette.common.white,
                  borderRadius: "0.6rem",
                },
              },
            }}
          >
            <MenuItem value={5}>5 results per page</MenuItem>
            <MenuItem value={10}>10 results per page</MenuItem>
            <MenuItem value={25}>25 results per page</MenuItem>
          </Select>
          <Pagination
            shape="rounded"
            count={Math.ceil(totalEmployee / limit)}
            page={page}
            onChange={handlePageChange}
            sx={{
              ".MuiPaginationItem-root": {
                border: `1px solid ${palette.accent.light}`,
                borderRadius: "0.95rem",
                padding: "0 1.2rem",
              },
              ".MuiPaginationItem-root.Mui-selected": {
                backgroundColor: palette.primary.main,
                borderColor: palette.primary.main,
                color: palette.common.white,
                "&:hover": {
                  backgroundColor: palette.primary.dark,
                  color: palette.common.white,
                },
              },
              ".Mui-focusVisible": {
                color: palette.text.primary,
                backgroundColor: palette.primary.main,
              },
              ".MuiPaginationItem-ellipsis": {
                border: "none",
                backgroundColor: "transparent",
              },
              ".MuiPaginationItem-previousNext": {
                border: "none",
              },
            }}
          />
          <Typography>
            <strong>
              {startIndex} - {endIndex}
            </strong>{" "}
            / {employeeLength} results
          </Typography>
        </Box>
      </>
      {/* ) : (
         ""
      )} */}
    </>
  );
};

EmployeeList.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default EmployeeList;
