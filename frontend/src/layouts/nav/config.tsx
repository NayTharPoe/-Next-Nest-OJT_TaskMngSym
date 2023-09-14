import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RocketIcon from '@mui/icons-material/Rocket';
import ReportIcon from '@mui/icons-material/Report';

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: <DashboardIcon />,
  },
  {
    title: 'user',
    path: '/employee/list',
    icon: <AccountBoxIcon />,
  },
  {
    title: 'project',
    path: '/project/list',
    icon: <RocketIcon />,
  },
  {
    title: 'task',
    path: '/task/list',
    icon: <AssignmentIcon />,
  },
  {
    title: 'report',
    path: '/report/list',
    icon: <ReportIcon />,
  },
];

export { navConfig };
