import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';

const queryClient = new QueryClient();

import Home from './Home';

describe('Home component', () => {
  it('Home render loading', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
      { wrapper: HashRouter },
    );
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });
});
