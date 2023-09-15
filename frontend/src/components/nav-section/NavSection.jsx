import PropTypes from 'prop-types';
import { Box, List, ListItemText } from '@mui/material';
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { useRouter } from 'next/router';
import palette from '@/theme/palette';

const NavSection = ({ data = [], ...other }) => {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
};

const NavItem = ({ item }) => {
  const { title, path, icon } = item;
  const router = useRouter();

  const routerPath = router.pathname.split('/')[1];
  const isRouteActive = routerPath === path.split('/')[1];

  return (
    <StyledNavItem
      className={isRouteActive ? 'active' : ''}
      sx={{
        borderRadius: '7.5px',
        '&.active': {
          color: palette.common.white,
          bgcolor: palette.charcoal.light,
        },
        '&:hover': {
          color: palette.common.white,
        },
      }}
      onClick={() => {
        router.push(path);
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
      <ListItemText disableTypography primary={title} />
    </StyledNavItem>
  );
};

export default NavSection;

NavItem.propTypes = {
  item: PropTypes.object,
};

NavSection.propTypes = {
  data: PropTypes.array,
};
