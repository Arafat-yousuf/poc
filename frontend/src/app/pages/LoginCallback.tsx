import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { meHandler } from '../../api/handlers/user.api.handler';
import { useUserStore } from '../stores/user.store';

function useURlQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function LoginCallback() {
  const navigate = useNavigate();
  const query = useURlQuery();

  const { token, setToken, loginUser, isLoggedIn } = useUserStore((state) => ({
    token: state.token,
    setToken: state.setToken,
    loginUser: state.loginUser,
    isLoggedIn: state.isLoggedIn,
  }));
  const { data } = useQuery(['token', token], meHandler, {
    enabled: !!token,
  });

  useEffect(() => {
    if (!isLoggedIn) {
      const accessToken = query.get('access_token');
      if (accessToken) {
        setToken(accessToken);
        const state = query.get('state');
        if (state) {
          navigate(state);
        } else {
          navigate('/');
        }
      } else {
        console.log('Missing accessToken');
      }
    }
  }, [isLoggedIn, navigate, query, setToken]);

  useEffect(() => {
    if (data?.data) {
      loginUser(data.data);
    }
  }, [data?.data, loginUser]);

  // console.log('signin callback');

  return <>Auth callback</>;
}
