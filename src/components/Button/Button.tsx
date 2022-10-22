import cn from 'classnames';

import s from './Button.module.scss';

interface TOwnProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ghost?: boolean;
  onClick?: (param: React.MouseEvent<HTMLElement>) => void;
}

const Button: React.FC<TOwnProps & JSX.IntrinsicElements['button']> = ({
  className,
  children,
  disabled = false,
  onClick,
  type = 'button',
  ghost = false,
  ...props
}) => {
  const classes = cn(ghost ? s.ghost : s.root, className);

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {typeof children === 'string' ? (
        <span className={s.text}>{children}</span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
