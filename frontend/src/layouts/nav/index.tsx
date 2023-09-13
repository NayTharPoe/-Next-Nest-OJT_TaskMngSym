import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from '@mui/material';
import { navConfig } from './config';
import NavSection from '@/components/nav-section/NavSection';
import { theme } from '@/theme/theme';

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const RenderContent = () => {
  const account = {
    displayName: 'James Saquadigo',
    photoURL:
      'https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_default.jpg',
  };

  return (
    <div>
      <Box
        sx={{
          px: 2.5,
          py: 3,
          display: 'inline-flex',
          fontSize: '22px',
          fontWeight: '600',
          color: 'milky.base'
        }}>
        TaskSphere
      </Box>

      <Box
        sx={{
          mb: 5,
          mx: 2.5,
          backgroundColor: 'text.base',
          borderRadius: '10px',
        }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" color={(theme: any) => `${theme.palette.text['100']}`}>
                {account.displayName}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />
    </div>
  );
};

export default RenderContent;
