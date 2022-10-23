import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import Main from './Main';

const queryClient = new QueryClient();

test('Main rendering', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>,
    { wrapper: BrowserRouter },
  );

  expect(screen.getByText(/App/i)).toBeInTheDocument();
});

test('Main 404', () => {
  const badRoute = '/blabla404blabla';

  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <Main />
    </MemoryRouter>,
  );

  expect(screen.getByText(/Error/i)).toBeInTheDocument();
});
