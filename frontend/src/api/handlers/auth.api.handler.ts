import { api } from '../apiClient';

export const checkLoginHandler = () => api.get<string>('/api/auth/check-login', { withCredentials: true });

export const logOutHandler = () => api.post('/api/auth/logout', undefined, { withCredentials: true });
