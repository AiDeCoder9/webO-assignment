import classNames from 'classnames';
import React, { InputHTMLAttributes, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  background?: boolean;
  hasError?: boolean;
  label: string;
}
export default function Input(props: InputProps) {
  const { background = false, hasError = false, label, ...args } = props;
  const id = useId();

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        {...args}
        autoComplete={'off'}
        id={id}
        className={classNames('form-control', { background: background, error: hasError })}
      />
    </div>
  );
}
