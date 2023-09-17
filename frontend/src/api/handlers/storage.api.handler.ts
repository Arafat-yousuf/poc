import { GDriveResponse } from '../../models/gdrive.response';
import { api } from '../apiClient';

export const getFilesHandler = () => api.get<GDriveResponse[]>('/api/storage/getFiles');
export const getStartPageTokenHandler = () => api.get('/api/storage/getStartPageToken');
export const syncChangesHandler = () => api.get('/api/storage/syncChanges');
