import { formatDate } from 'utils/dates';

import s from './TextCard.module.scss';

interface Props {
  date: Date;
  description: string;
}

const TextCard = ({ date, description }: Props) => (
  <article className={s.root}>
    <header className={s.header}>
      <h4 className={s.date}>{formatDate(date)}</h4>
    </header>
    <div className={s.content}>{description}</div>
  </article>
);

export default TextCard;
