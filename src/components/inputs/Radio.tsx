import React, { InputHTMLAttributes } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Radio(props: RadioProps) {
  const { label, id, ...args } = props;
  return (
    <div className={'input-radio'}>
      <input {...args} type="radio" role="radio" id={id} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
