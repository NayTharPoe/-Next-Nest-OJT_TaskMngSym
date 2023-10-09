import { useState, useEffect, useRef } from "react";
import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTheme } from "@mui/material/styles";
import palette from "@/theme/palette";
import { useRouter } from "next/router";
import axios from "axios";
import { socket } from "../../socket";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { StyledGridOverlay } from "@/components/styledGridOverlay";
import { apiClient } from "@/services/apiClient";
import config from "@/config";

dayjs.extend(relativeTime);

const Header = () => {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const notificationIconRef = useRef<any>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [filterNotificationData, setFilterNotificationData] = useState([]);
  const [notificationBadgeCount, setNotificationBadgeCount] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState<any>({});
  const router = useRouter();
  const location = useRouter();

  const logoutApi = () => {
    localStorage.removeItem("user");
    router.push("/auth/login");
    setAnchorElUser(null);
  };

  const handleChangePassword = () => {
    router.push("/auth/change-password");
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    const loginUser = localStorage.getItem("user");
    if (loginUser) {
      const { _id } = JSON.parse(loginUser);
      router.push(`/employee/detail/${_id}`);
    }
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNotificationBox = () => {
    setShowMessageBox((prevShowMessageBox) => !prevShowMessageBox);
  };

  const routePath = router.pathname.split("/")[1];
  let pageTitle = "";
  switch (routePath) {
    case "project":
      pageTitle = "Projects";
      break;
    case "employee":
      pageTitle = "Employees";
      break;
    case "task":
      pageTitle = "Tasks";
      break;
    case "report":
      pageTitle = "Reports";
      break;
    default:
      break;
  }

  const handleEditNotification = async (id: any) => {
    try {
      setFilterNotificationData((prevFilterNotificationData) =>
        prevFilterNotificationData.filter(
          (notification: any) => notification._id !== id
        )
      );

      setNotificationBadgeCount((prevCount) => Math.max(prevCount - 1, 0));
      const res = await apiClient.patch(
        `${config.SERVER_DOMAIN}/notification/edit/${id}`,
        {
          read: [loggedInUser?._id],
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllNotifications = async () => {
    try {
      const curr_user = JSON.parse(localStorage.getItem("user") ?? "");
      const res = await apiClient.get(
        `${config.SERVER_DOMAIN}/notifications/list`
      );
      const allNotifications = res?.data?.data || [];

      const filteredNotifications = allNotifications.filter((row: any) => {
        if (
          row.tag === "REPORT" &&
          row.createdByWhom !== curr_user?._id &&
          row.sendTo === curr_user?._id &&
          !row.read.includes(curr_user?._id)
        ) {
          return true;
        }
        if (
          row.tag === "TASK" &&
          !row.read.includes(curr_user?._id) &&
          row.createdByWhom !== curr_user?._id
        ) {
          return curr_user?.position === "1" || row.sendTo === curr_user?._id;
        }
        return false;
      });

      setFilterNotificationData(filteredNotifications);
      setNotificationBadgeCount(filteredNotifications?.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const eventNames: string[] = [
      "createReportNotifications",
      "createTaskNotifications",
      "updateTaskNotifications",
    ];

    const handleCreateNotifications = async () => {
      await fetchAllNotifications();
    };

    eventNames.forEach((eventName: string) => {
      socket.on(eventName, handleCreateNotifications);
    });

    return () => {
      eventNames.forEach((eventName) => {
        socket.off(eventName, handleCreateNotifications);
      });
    };
  }, []);

  useEffect(() => {
    if (
      window.performance.navigation.type ===
      window.performance.navigation.TYPE_RELOAD
    ) {
      fetchAllNotifications();
    }
  }, []);

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("user") ?? "{}"));
  }, []);

  useEffect(() => {
    fetchAllNotifications();
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMessageBox && notificationIconRef.current) {
        const notificationBox = document.querySelector(".notification-box");
        if (
          notificationBox &&
          !notificationBox.contains(event.target as Node)
        ) {
          setShowMessageBox(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMessageBox]);

  return (
    <Box
      sx={{
        width: "100%",
        display: { xs: "none", md: "flex", gap: 15 },
        mt: 3,
        mb: 3,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h2" sx={{ color: palette.text.primary }}>
          {pageTitle}
        </Typography>
      </Box>
      <Box sx={{ width: "max-content", display: "flex", gap: 3 }}>
        <Box sx={{ position: "relative" }}>
          <IconButton onClick={handleNotificationBox} ref={notificationIconRef}>
            <Badge
              color="error"
              variant="dot"
              invisible={notificationBadgeCount <= 0}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* notification item */}
          {showMessageBox && (
            <Box
              sx={{
                position: "absolute",
                top: 50,
                left: -320,
                width: 360,
                bgcolor: palette.common.white,
                borderRadius: ".75rem",
                p: 1,
                pt: 0,
                boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
              }}
              className="notification-box"
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
              >
                <Typography variant="h4" color={palette.text.primary}>
                  Notification
                </Typography>
                <Chip
                  label={
                    notificationBadgeCount
                      ? `unread ${notificationBadgeCount}`
                      : "unread 0"
                  }
                  size="small"
                  sx={{
                    backgroundColor: palette.primary.dark,
                    color: palette.common.white,
                  }}
                  variant="filled"
                />
              </Box>
              <Divider />
              <List component="nav" sx={{ overflow: "auto", height: 300 }}>
                {filterNotificationData?.length <= 0 ? (
                  <StyledGridOverlay>
                    <svg
                      style={{ flexShrink: 0, marginTop: "1rem" }}
                      width="200"
                      height="90"
                      viewBox="0 0 184 152"
                      aria-hidden
                      focusable="false"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g transform="translate(24 31.67)">
                          <ellipse
                            className="ant-empty-img-5"
                            cx="67.797"
                            cy="106.89"
                            rx="67.797"
                            ry="12.668"
                          />
                          <path
                            className="ant-empty-img-1"
                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                          />
                          <path
                            className="ant-empty-img-2"
                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                          />
                          <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                          />
                        </g>
                        <path
                          className="ant-empty-img-3"
                          d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                        />
                        <g
                          className="ant-empty-img-4"
                          transform="translate(149.65 15.383)"
                        >
                          <ellipse
                            cx="20.654"
                            cy="3.167"
                            rx="2.849"
                            ry="2.815"
                          />
                          <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                        </g>
                      </g>
                    </svg>
                    <Box
                      sx={{
                        mt: 2,
                        color: palette.text.primary,
                        fontSize: ".85rem",
                      }}
                    >
                      No Notifications
                    </Box>
                  </StyledGridOverlay>
                ) : (
                  filterNotificationData?.map((notification: any) => (
                    <ListItem
                      key={notification._id}
                      alignItems="flex-start"
                      onClick={() => handleEditNotification(notification?._id)}
                    >
                      <ListItemButton
                        sx={{ flexDirection: "column", borderRadius: ".65rem" }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ListItemAvatar>
                            <Avatar
                              alt="profile pics"
                              src={notification?.profile}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            sx={{ alignItems: "center" }}
                            primary={
                              <Typography
                                sx={{
                                  color: palette.text.primary,
                                  fontWeight: "600",
                                }}
                              >
                                {notification?.tag}
                              </Typography>
                            }
                            secondary={
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: notification.message,
                                }}
                              />
                            }
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "auto",
                            mt: 1,
                          }}
                        >
                          <AccessTimeFilledIcon
                            fontSize="small"
                            color="primary"
                          />
                          <Typography
                            sx={{
                              color: palette.text.primary,
                              fontSize: "0.75rem",
                              ml: 0.5,
                            }}
                          >
                            {dayjs(notification?.createdAt).fromNow()}
                          </Typography>
                        </Box>
                      </ListItemButton>
                    </ListItem>
                  ))
                )}
              </List>
            </Box>
          )}
        </Box>
        {/* profile item */}
        <Box>
          <Tooltip title="Account settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="profile picture" src={loggedInUser?.profile} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{
              mt: "45px",
              ".MuiPaper-elevation": {
                boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
                backgroundColor: palette.common.white,
              },
            }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
            <MenuItem onClick={logoutApi}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
