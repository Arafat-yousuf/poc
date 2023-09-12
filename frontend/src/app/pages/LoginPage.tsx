import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { meHandler } from '../../api/handlers/user.api.handler';
import { isNavigationState } from '../helpers/navigation-state';
import { useUserStore } from '../stores/user.store';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = createTheme();
  const { token, loginUser } = useUserStore((state) => ({ token: state.token, loginUser: state.loginUser }));
  const { data } = useQuery(['token', token], meHandler, { enabled: !!token });

  useEffect(() => {
    if (data?.data) {
      loginUser(data.data);
      if (isNavigationState(location.state)) {
        navigate(location.state.from, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [data?.data, location.state, loginUser, navigate]);

  const handleGoogleClicked = () => {
    if (isNavigationState(location.state) && location.state.from) {
      window.location.replace(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/oauth/google?state=${import.meta.env.VITE_CLIENT_BASE_URL + location.state.from}`,
      );
    } else {
      window.location.replace(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/oauth/google?state=${import.meta.env.VITE_CLIENT_BASE_URL}`,
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <img src={'assets/dhub_120_120.png'} alt='logo' />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Box
                className='googleLoginButton'
                onClick={handleGoogleClicked}
                sx={{
                  background: 'url("assets/login_google_btn.png") transparent 0px 50% no-repeat',
                  display: 'inline-block',
                  color: '#444',
                  width: '180px',
                  height: '39px',
                  borderRadius: '5px',
                  border: 'thin solid #888',
                  boxShadow: '1px 1px 1px grey',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              ></Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
