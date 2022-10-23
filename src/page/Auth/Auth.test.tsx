import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';

import Auth from './Auth';

const queryClient = new QueryClient();

describe('Auth component', () => {
  it('Auth renders', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Auth />
      </QueryClientProvider>,
      { wrapper: HashRouter },
    );
    expect(screen.getByText(/Login/)).toBeInTheDocument();
  });
});
