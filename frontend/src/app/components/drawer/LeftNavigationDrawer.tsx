import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import useResize from '../../hooks/useResize';

export default function LeftNavigationDrawer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { width, enableResize } = useResize({});

  const isSelectedPage = (path: string) => {
    const urlParts = pathname.replace(/\/\s*$/, '').split('/');
    return urlParts[1] === path;
  };

  const handleRouteClicked = (route: string) => {
    navigate(`/${route}`);
  };
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: width, boxSizing: 'border-box', marginTop: 8 },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }} component='nav'>
          <List
            disablePadding
            sx={{
              '&& .Mui-selected, && .Mui-selected:hover': {
                bgcolor: 'LightGray',
                '&, & .MuiListItemIcon-root': {
                  color: 'black',
                },
                fontWeight: 'bold',
              },
              '& .MuiListItemButton-root:hover': {
                bgcolor: 'GhostWhite',
                '&, & .MuiListItemIcon-root': {
                  color: 'black',
                },
              },
              overflow: 'auto',
              maxHeight: 300,
            }}
          >
            <ListItemButton selected={isSelectedPage('test')} onClick={() => handleRouteClicked('test')}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary='Orders' />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary='Reports' />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary='Integrations' />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
          </List>
        </List>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          width: '5px',
          top: '0',
          right: '-1px',
          bottom: '0',
          cursor: 'col-resize',
          '&:hover': { backgroundColor: 'lightGray' },
        }}
        onMouseDown={enableResize}
      />
    </Drawer>
  );
}
