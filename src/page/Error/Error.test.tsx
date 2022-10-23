import { render, screen } from '@testing-library/react';

import Error from './Error';

describe('Error component', () => {
  it('Error renders', () => {
    render(<Error />);
    expect(screen.getByText(/Error/)).toBeInTheDocument();
  });
});
