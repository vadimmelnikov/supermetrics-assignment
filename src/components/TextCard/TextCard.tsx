import { formatDate } from 'utils/dates';

import s from './TextCard.module.scss';

interface Props {
  date: Date;
  description: string;
}

const TextCard = ({ date, description }: Props) => (
  <article className={s.root}>
    <header className={s.header}>
      <p className={s.date}>{formatDate(date)}</p>
    </header>
    <div className={s.content}>{description}</div>
  </article>
);

export default TextCard;
