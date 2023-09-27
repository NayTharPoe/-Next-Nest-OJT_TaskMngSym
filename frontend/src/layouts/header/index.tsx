import { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import palette from '@/theme/palette';
import { useRouter } from 'next/router';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const settings = ['Profile', 'Change Password', 'Logout'];

function notificationsLabel(count: number) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenMessageMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event?.currentTarget);
  };

  const handleCloseMessageMenu = () => {
    setAnchorElMenu(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
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
        {/* notification item */}
        <Box>
          <IconButton aria-label={notificationsLabel(100)} onClick={handleOpenMessageMenu}>
            <Badge badgeContent={100} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            sx={{ mt: '45px', boxShadow: 0 }}
            id="noti-appbar"
            anchorEl={anchorElMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElMenu)}
            onClose={handleCloseMessageMenu}
          >
            <Box sx={{ width: 370 }}>
              <AppBar position="static" sx={{ backgroundColor: 'transparent' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                  sx={{
                    backgroundColor: (theme: any) => `${theme.palette.background['100']}`,
                  }}
                >
                  <Tab label="Reports" {...a11yProps(0)} />
                  <Tab label="Tasks" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
            </Box>
          </Menu>
        </Box>
        {/* profile item */}
        <Box>
          <Tooltip title="Account settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="profile picture"
                src="https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_default.jpg"
              />
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
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
