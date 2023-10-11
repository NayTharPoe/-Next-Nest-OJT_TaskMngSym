import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Typography, Avatar, Stack } from '@mui/material';
import { navConfig } from './config';
import NavSection from '@/components/nav-section/NavSection';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const RenderContent = () => {
  const [loggedInUser, setLoggedInUser] = useState<any>({});
  const account = {
    displayName: loggedInUser?.employeeName,
    photoURL: loggedInUser?.profile,
  };
  const location = useRouter();

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem('user') ?? '{}'));
  }, []);

  const permissionNavItem =
    loggedInUser && loggedInUser?.position !== '1'
      ? navConfig.filter((nav) => nav.user === 'true')
      : navConfig;

  return (
    <div>
      <Box
        sx={{
          px: 2.5,
          py: 3,
          display: 'inline-flex',
          fontSize: '22px',
          fontWeight: '600',
          color: (theme) => `${theme.palette.grey[300]}`,
        }}
      >
        TaskSphere
      </Box>

      <Box
        sx={{
          mb: 5,
          mx: 2.5,
          backgroundColor: (theme: any) => `${theme.palette.charcoal.light}`,
          borderRadius: '10px',
        }}
      >
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle1" color={(theme: any) => `${theme.palette.common.white}`}>
                {account.displayName}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={permissionNavItem} />
    </div>
  );
};

export default RenderContent;
