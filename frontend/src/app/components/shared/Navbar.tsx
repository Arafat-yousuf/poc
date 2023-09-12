import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import HomeIcon from '@mui/icons-material/Home';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Badge, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { logOutHandler } from '../../../api/handlers/auth.api.handler';
import { useUserStore } from '../../stores/user.store';

export type NavbarProps = {
  minimalNavbar?: boolean;
};

export default function Navbar(props: NavbarProps) {
  const navigate = useNavigate();
  const { logoutUser } = useUserStore((state) => ({ logoutUser: state.logoutUser }));
  const [anchorUserProfileEl, setAnchorUserProfileEl] = React.useState<null | HTMLElement>(null);

  const handleHomeClicked = () => {
    navigate({ pathname: '/' });
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUserProfileEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorUserProfileEl(null);
  };

  const handleClickUserProfile = () => {
    handleProfileMenuClose();
  };

  async function handleLogOut() {
    return await logOutHandler();
  }

  const logOutMutation = useMutation(handleLogOut);

  const handleClickLogOut = React.useCallback(async () => {
    await logOutMutation.mutateAsync();
    logoutUser();
  }, [logOutMutation, logoutUser]);

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorUserProfileEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={anchorUserProfileEl != null}
      onClose={handleProfileMenuClose}
    >
      <MenuItem id='profile' onClick={handleClickUserProfile}>
        <IconButton aria-label='profile' color='inherit'>
          <Badge color='secondary'>
            <AccountCircleRoundedIcon />
          </Badge>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem id='logOut' onClick={handleClickLogOut}>
        <IconButton aria-label='logout' color='inherit'>
          <Badge color='secondary'>
            <LogoutOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={(theme) => ({ position: 'fixed', zIndex: theme.zIndex.drawer + 1 })}>
        <Toolbar>
          <IconButton size='small' edge='start' color='inherit' sx={{ mr: 2 }} onClick={handleHomeClicked}>
            <HomeIcon />
          </IconButton>
          <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title='Profile' aria-label='user-profile'>
            <IconButton onClick={handleProfileMenuOpen} size='large' edge='end' aria-haspopup='true' color='inherit'>
              <AccountCircle />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {renderProfileMenu}
    </Box>
  );
}
