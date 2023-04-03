import React from 'react';
import { Input, Label, InputProps } from 'reactstrap';
interface CheckboxProps extends InputProps {
  label?: string;
}
export default function Checkbox(props: CheckboxProps) {
  const { label, ...args } = props;
  return (
    <div>
      <Input {...args} type="checkbox" />
      <Label check>{label}</Label>
    </div>
  );
}
