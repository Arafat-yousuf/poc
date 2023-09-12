import { create } from 'zustand';
import { SnackbarColorType } from '../../types/snackbar.color.type';

export interface SnackbarState {
  open?: boolean;
  message?: string;
  snackbarType?: SnackbarColorType | undefined;
  setSnackbarElements: (open: boolean, message: string, snackbarType: SnackbarColorType | undefined) => void;
  closeSnackbar: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => {
  return {
    open: false,
    message: '',
    snackbarType: undefined,
    setSnackbarElements: (open: boolean, message: string, snackbarType: SnackbarColorType | undefined) => {
      set({ open, message, snackbarType });
    },
    closeSnackbar: () => {
      set({ open: false });
    },
  };
});
