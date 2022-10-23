import { render, screen } from '@testing-library/react';

import TextCard from './TextCard';

const DATE = new Date();

const DESCRIPTION = '123123';

describe('TextCard component', () => {
  it('TextCard renders', () => {
    render(<TextCard date={DATE} description={DESCRIPTION} />);

    expect(screen.getByText('123123')).toBeInTheDocument();
  });

  it('TextCard is null', () => {
    render(<TextCard date={DATE} description={DESCRIPTION} />);

    expect(screen.queryByRole('123123')).toBeNull();
  });
});
