import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent } from '@testing-library/react';
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
  it('Auth not submited', () => {
    const { getByLabelText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <Auth />
      </QueryClientProvider>,
      { wrapper: HashRouter },
    );
    const nameValue = 'test##';
    const emailValue = 'test@test.com';

    fireEvent.change(getByLabelText(/Name/i), {
      target: { value: nameValue },
    });
    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: emailValue },
    });

    fireEvent.click(getByTestId('submit'));

    const errorMsg = screen.queryByText(/Error/);

    expect(errorMsg).toBeNull();
  });
});
