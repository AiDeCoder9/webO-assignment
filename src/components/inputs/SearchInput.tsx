import classNames from 'classnames';
import React, { InputHTMLAttributes } from 'react';
import { BiSearch } from 'react-icons/bi';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  background?: boolean;
}
export default function SearchInput(props: SearchInputProps) {
  const { background = false, ...args } = props;

  return (
    <div className="position-relative input-search">
      <input
        {...args}
        type="text"
        className={classNames('form-control', { background: background })}
      />
      <div className="icon">
        <BiSearch size={24} />
      </div>
    </div>
  );
}
