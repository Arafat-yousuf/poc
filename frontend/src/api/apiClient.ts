import axios from 'axios';
import { UserState, useUserStore } from '../app/stores/user.store';
export const api = axios.create({ baseURL: import.meta.env.VITE_SERVER_BASE_URL });

export const unsub = useUserStore.subscribe((state: UserState, prevState: UserState) => {
  if (prevState.token === state.token) {
    return;
  }
  console.log('setting new auth header');
  api.defaults.headers.common = {
    Authorization: `Bearer ${state.token}`,
  };
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
