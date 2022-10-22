import ShowMore from 'react-show-more';

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
    <div className={s.content}>
      <ShowMore lines={4} more="Show more" less="Show less">
        {description}
      </ShowMore>
    </div>
  </article>
);

export default TextCard;
