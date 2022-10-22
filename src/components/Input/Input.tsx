import { forwardRef, InputHTMLAttributes } from 'react';

import cn from 'classnames';

import s from './Input.module.scss';

export interface InputPropsTypes extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isError?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputPropsTypes>(
  (
    {
      disabled = false,
      isError = false,
      name,
      type = 'text',
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    const classNames = cn(s.root, className, {
      [s.disabled]: disabled,
      [s.error]: isError,
    });

    return (
      <>
        <input
          {...props}
          className={classNames}
          id={name}
          type={type}
          name={name}
          onChange={onChange}
          disabled={disabled}
          ref={ref}
        />
      </>
    );
  },
);

export default Input;
