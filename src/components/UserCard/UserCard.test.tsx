import { render, screen } from '@testing-library/react';

import UserCard from './UserCard';

const TITLE = '123123';

const FUNC = () => null;

describe('UserCard component', () => {
  it('UserCard renders', () => {
    render(
      <UserCard title={TITLE} count={2} isActive={false} onClick={FUNC} />,
    );

    expect(screen.getByText('123123')).toBeInTheDocument();
  });

  it('UserCard is null', () => {
    render(
      <UserCard title={TITLE} count={2} isActive={false} onClick={FUNC} />,
    );

    expect(screen.queryByRole('123123')).toBeNull();
  });

  it('UserCard snapshot', () => {
    const card = render(
      <UserCard title={TITLE} count={2} isActive={false} onClick={FUNC} />,
    );

    expect(card).toMatchSnapshot();
  });
});
