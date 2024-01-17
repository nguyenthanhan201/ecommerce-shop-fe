import { QueryClient, QueryClientProvider } from 'react-query';

// Create a new instance of QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false // Disable automatic retries on query failures
    }
  }
});

export { queryClient, QueryClientProvider };
