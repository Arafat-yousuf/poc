import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { checkLoginHandler } from '../../api/handlers/auth.api.handler';
import { SnackbarColorType } from '../../types/snackbar.color.type';
import { useSnackbarStore } from '../stores/snackbar.store';
import { useUserStore } from '../stores/user.store';

const ProtectedRoute = () => {
  const location = useLocation();
  const [isCheckingLoginStatus, setIsCheckingLoginStatus] = useState(true);
  const { setToken, isLoggedIn, logoutUser } = useUserStore((state) => ({
    setToken: state.setToken,
    isLoggedIn: state.isLoggedIn,
    logoutUser: state.logoutUser,
  }));
  const { setSnackbarElements } = useSnackbarStore((state) => ({
    setSnackbarElements: state.setSnackbarElements,
  }));

  const { data } = useQuery(['check-login'], checkLoginHandler, {
    retry: false,
    onError: (error) => {
      console.log(error);
      setSnackbarElements(true, 'Unauthorized', SnackbarColorType.error);
      setIsCheckingLoginStatus(false);
      logoutUser();
    },
  });

  useEffect(() => {
    if (isCheckingLoginStatus) {
      if (data?.data) {
        setToken(data.data);
        setIsCheckingLoginStatus(false);
      }
    }
  }, [data?.data, isCheckingLoginStatus, setToken]);

  return isCheckingLoginStatus ? null : isLoggedIn ? <Outlet /> : <Navigate to='/login' state={{ from: location.pathname }} />;
};

export default ProtectedRoute;
