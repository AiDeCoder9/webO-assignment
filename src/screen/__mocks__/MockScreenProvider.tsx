import ErrorBoundary from '@/components/feedback/ErrorBoundary';
import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

const createWrapper = (props: MockScreenProviderProps) => {
  const { children } = props;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });
  setLogger({
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console
    error: () => console.log('')
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<h1>Loading</h1>}>{children}</Suspense>
        </ErrorBoundary>
      </Router>
    </QueryClientProvider>
  );
};

export default createWrapper;
