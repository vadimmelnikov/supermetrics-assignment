import cn from 'classnames';

import Button from 'components/Button';

import s from './UserCard.module.scss';

interface Props {
  title: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

const UserCard = ({ title, count, isActive = false, onClick }: Props) => (
  <Button
    className={cn(s.root, { [s.active]: isActive })}
    ghost
    onClick={onClick}
  >
    <p className={s.title}>{title}</p>
    <span className={s.count}>{count}</span>
  </Button>
);

export default UserCard;
