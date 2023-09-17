import { UserResponse } from '../../app/stores/user.store';
import { api } from '../apiClient';

export const meHandler = () => api.get<UserResponse>('/api/user/me');
