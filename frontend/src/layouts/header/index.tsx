import { useState, useEffect } from 'react';
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
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTheme } from '@mui/material/styles';
import palette from '@/theme/palette';
import { useRouter } from 'next/router';
import axios from 'axios';
import { socket } from '../../socket';
import dayjs from 'dayjs';

const Header = () => {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [filterNotificationData, setFilterNotificationData] = useState([]);
  const [notificationBadgeCount, setNotificationBadgeCount] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState<any>({});
  const theme = useTheme();

  const logoutApi = () => {
    localStorage.removeItem('user');
    router.push('/auth/login');
    setAnchorElUser(null);
  };

  const handleChangePassword = () => {
    router.push('/auth/change-password');
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    const loginUser = localStorage.getItem('user');
    if (loginUser) {
      const { _id } = JSON.parse(loginUser);
      router.push(`employee/detail/${_id}`);
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

  const router = useRouter();
  const routePath = router.pathname.split('/')[1];
  let pageTitle = '';
  switch (routePath) {
    case 'project':
      pageTitle = 'Projects';
      break;
    case 'employee':
      pageTitle = 'Employees';
      break;
    case 'task':
      pageTitle = 'Tasks';
      break;
    case 'report':
      pageTitle = 'Reports';
      break;
    default:
      break;
  }

  const fetchAllNotifications = async () => {
    try {
      const curr_user = JSON.parse(localStorage.getItem('user') ?? '');
      const res = await axios.get('http://localhost:8080/notifications/list');
      const allNotifications = res?.data?.data || [];

      const filteredNotifications = allNotifications.filter((row: any) => {
        if (
          row.tag === 'REPORT' &&
          row.createdByWhom !== curr_user?._id &&
          row.sendTo === curr_user?._id &&
          !row.read.includes(curr_user?._id)
        ) {
          return true;
        }
        if (
          row.tag === 'TASK' &&
          !row.read.includes(curr_user?._id) &&
          row.createdByWhom !== curr_user?._id
        ) {
          return curr_user?.position === '0' || row.sendTo === curr_user?._id;
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
    const eventNames: string[] = ['createReportNotifications'];

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
    if (window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
      fetchAllNotifications();
    }
  }, []);

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem('user') ?? ''));
  }, []);

  console.log('filterNoti', filterNotificationData);
  return (
    <Box
      sx={{
        width: '100%',
        display: { xs: 'none', md: 'flex', gap: 15 },
        mt: 3,
        mb: 3,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h2" sx={{ color: palette.text.primary }}>
          {pageTitle}
        </Typography>
      </Box>
      <Box sx={{ width: 'max-content', display: 'flex', gap: 3 }}>
        <Box sx={{ position: 'relative' }}>
          <IconButton onClick={handleNotificationBox}>
            <Badge color="primary" variant="dot" invisible={notificationBadgeCount <= 0}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* notification item */}
          {showMessageBox && (
            <Box
              sx={{
                position: 'absolute',
                top: 50,
                left: -320,
                width: 360,
                bgcolor: palette.common.white,
                borderRadius: '.75rem',
                p: 1,
                pt: 0,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Typography variant="h4" color={palette.text.primary}>
                  Notification
                </Typography>
                <Chip
                  label={notificationBadgeCount ? `New ${notificationBadgeCount}` : 'no news'}
                  size="small"
                  sx={{ backgroundColor: palette.primary.main, color: palette.common.white }}
                  variant="filled"
                />
              </Box>
              <Divider />
              <List component="nav" sx={{ overflow: 'auto', maxHeight: 360 }}>
                {filterNotificationData?.length <= 0 ? (
                  <Typography sx={{ color: palette.text.primary }}>no notifications</Typography>
                ) : (
                  filterNotificationData?.map((notification: any) => (
                    <ListItem key={notification._id} alignItems="flex-start">
                      <ListItemButton sx={{ flexDirection: 'column', borderRadius: '.65rem' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ListItemAvatar>
                            <Avatar alt="profile pics" src={notification?.profile} />
                          </ListItemAvatar>
                          <ListItemText
                            sx={{ alignItems: 'center' }}
                            primary={
                              <Typography sx={{ color: palette.text.primary, fontWeight: '600' }}>
                                {notification?.tag}
                              </Typography>
                            }
                            secondary={<span dangerouslySetInnerHTML={{ __html: notification.message }} />}
                          />
                        </Box>
                        <Typography
                          sx={{ color: palette.text.primary, fontSize: '0.75rem', marginLeft: 'auto' }}
                        >
                          {dayjs(notification?.createdAt).format('YYYY/MM/DD')}
                        </Typography>
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
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
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
