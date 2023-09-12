export type NavigationState = {
  from: string;
};

export function isNavigationState(obj: unknown): obj is NavigationState {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  return 'from' in obj;
}
