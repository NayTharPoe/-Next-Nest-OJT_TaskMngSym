import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Header from '@/layouts/header';
import RenderContent from '@/layouts/nav';
import { useRouter } from 'next/router';

const MainLayout = (props: any) => {
  const location = useRouter();
  const router = useRouter();
  const drawerWidth = 290;

  const { window, children } = props;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    const user = localStorage.getItem('user');
    const position = user ? JSON.parse(user).position : null;

    if (position !== '1') {
      if (location.pathname.includes('employee') || location.pathname.includes('project')) {
        router.push('/unAuthorized');
      }
    }
  }, [location.pathname]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { xl: `calc(100% - ${drawerWidth}px)` },
          ml: { xl: `${drawerWidth}px` },
          boxShadow: 'none',
          backgroundColor: (theme) => `${theme.palette.background.paper}`,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: 'none' },
              color: (theme: any) => `${theme.palette.charcoal.main}`,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>
      {/* side bar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '.MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          PaperProps={{
            sx: {
              backgroundColor: (theme: any) => `${theme.palette.charcoal.main}`,
            },
          }}
        >
          <RenderContent />
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '.MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
          PaperProps={{
            sx: {
              backgroundColor: (theme: any) => `${theme.palette.charcoal.main}`,
            },
          }}
        >
          <RenderContent />
        </Drawer>
      </Box>
      {/* dashboard content */}
      <Box
        component="main"
        sx={{
          overflow: 'hidden',
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: (theme) => `${theme.palette.background.paper}`,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

MainLayout.propTypes = {
  window: PropTypes.func,
};

export default MainLayout;
