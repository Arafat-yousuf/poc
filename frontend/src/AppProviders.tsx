import { PropsWithChildren, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export interface AppProvidersProps {
  children?: ReactNode | undefined;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ globally default to 5 minutes
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function AppProviders(props: PropsWithChildren<AppProvidersProps>) {

  if (!queryClient) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
