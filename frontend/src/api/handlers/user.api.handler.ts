import { UserResponse } from '../../app/stores/user.store';
import { GDriveResponse } from '../../models/gdrive.response';
import { api } from '../apiClient';

export const meHandler = () => api.get<UserResponse>('/api/user/me');
export const getFilesHandler = () => api.get<GDriveResponse[]>('/api/user/getFiles');
