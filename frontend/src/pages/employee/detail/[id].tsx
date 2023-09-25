// import MainLayout from "@/layouts/MainLayout";
// import {
//   Box,
//   Grid,
//   InputLabel,
//   Stack,
//   TextField,
//   CardMedia,
//   Select,
//   Button,
//   MenuItem,
// } from "@mui/material";
// import React, { ReactElement, useState } from "react";
// import palette from "@/theme/palette";
// import { useRouter } from "next/router";

// const EmployeeDetail = () => {
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//   const [selectedValue, setSelectedValue] = useState<number | null>(0);

//   const router = useRouter();

//   const CancelButton = (props: any) => {
//     return (
//       <Button
//         fullWidth
//         variant="contained"
//         sx={{
//           padding: "10px",
//           borderRadius: ".5rem",
//           boxShadow: "none",
//           background: palette.secondary.main,
//           color: palette.text.primary,
//           "&:hover": {
//             background: palette.secondary.main,
//             borderColor: palette.primary.border,
//             boxShadow: "none",
//           },
//         }}
//         {...props}
//       >
//         {props.children}
//       </Button>
//     );
//   };

//   return (
//     <>
//       <Box sx={{ width: { md: "70%", sm: "80%" }, margin: "0 auto" }}>
//         <Grid container spacing={4}>
//           <Grid item md={6} sm={6} xs={12}>
//             <InputLabel>Name</InputLabel>
//             <TextField disabled fullWidth placeholder="Employee Name..." />
//           </Grid>
//           <Grid item md={6} sm={6} xs={12}>
//             <InputLabel>Email</InputLabel>
//             <TextField disabled fullWidth placeholder="Email..." />
//           </Grid>
//           <Grid item xs={12}>
//             <Box
//               sx={{
//                 border: "1px solid #b0afaf",
//                 borderRadius: "6px",
//                 width: "48%",
//                 "@media (max-width: 600px)": { width: "65%" },
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 alt="img-upload"
//                 src="https://img.freepik.com/free-photo/cute-dog-studio_23-2150687309.jpg?size=626&ext=jpg&ga=GA1.1.988097705.1691639176&semt=sph"
//                 sx={{
//                   width: "100%",
//                   height: "170px",
//                   borderRadius: "5px",
//                   objectFit: "cover",
//                 }}
//               />
//             </Box>
//           </Grid>
//           <Grid item sm={6} xs={12}>
//             <InputLabel>Address</InputLabel>
//             <TextField disabled fullWidth placeholder="Address..." />
//           </Grid>
//           <Grid item sm={6} xs={12}>
//             <InputLabel>Phone</InputLabel>
//             <TextField disabled fullWidth placeholder="Phone..." />
//           </Grid>
//           <Grid item sm={6} xs={12}>
//             <InputLabel>DOB</InputLabel>
//             <TextField disabled fullWidth placeholder="DOB..." />
//           </Grid>
//           <Grid item sm={6} xs={12}>
//             <InputLabel>Position</InputLabel>
//             {/* <TextField fullWidth placeholder="Position..." /> */}
//             <Select
//               disabled
//               value={selectedValue}
//               onChange={(e) => setSelectedValue(e.target.value as number)}
//               fullWidth
//             >
//               <MenuItem value="0">Member</MenuItem>
//               <MenuItem value="1">Admin</MenuItem>
//             </Select>
//           </Grid>
//         </Grid>
//         <Stack
//           mt={3}
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//           direction={"column"}
//         >
//           <CancelButton onClick={() => router.push("/employee/list")}>
//             Cancel
//           </CancelButton>
//         </Stack>
//       </Box>
//     </>
//   );
// };

// EmployeeDetail.getLayout = function getLayout(page: ReactElement) {
//   return <MainLayout>{page}</MainLayout>;
// };

// export default EmployeeDetail;

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
import CardBtn from "@/components/cardBtn";
import palette from "@/theme/palette";
import HomeIcon from "@mui/icons-material/Home";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useRouter } from "next/router";
import { theme } from "@/theme";

const EmployeeList = () => {
  const router = useRouter();

  const employee = {
    id: 1,
    email: "mtm.linnaunghtet@gmail.com",
    phone: "09800900700",
    address: "Pathein",
    birthDate: "2023-56-90",
    verified: true,
  };

  return (
    <>
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
                    employee.verified
                      ? palette.info.light
                      : palette.error.lighter
                  }`,
                  color: `${
                    employee.verified ? palette.info.main : palette.error.main
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
                {employee.verified ? "Verified" : "Not Verified"}
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
                  {employee.email}
                </Typography>
                <Typography
                  style={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PhoneIcon style={{ fontSize: "20px", marginRight: "5px" }} />{" "}
                  {employee.phone}
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
                  {employee.address}
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
                  {employee.birthDate}
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
                  onClick={() => router.push(`/employee/edit/${employee.id}`)}
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
