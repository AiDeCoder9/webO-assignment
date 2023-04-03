import React from 'react';
import { Input, Label, InputProps } from 'reactstrap';
interface CheckboxProps extends InputProps {
  label?: string;
}
export default function Checkbox(props: CheckboxProps) {
  const { label, checked, ...args } = props;
  return (
    <div>
      <Input {...args} type="checkbox" checked={checked} />
      <Label check={checked}>{label}</Label>
    </div>
  );
}
