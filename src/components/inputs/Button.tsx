import { Button as RButton, ButtonProps } from 'reactstrap';

interface ButtonProperties extends ButtonProps {
  children?: React.ReactNode;
  loading?: boolean;
}
export default function Button(props: ButtonProperties) {
  const { loading = false, children, disabled, ...args } = props;
  return (
    <RButton {...args} disabled={disabled || loading}>
      {loading ? 'Loading' : children}
    </RButton>
  );
}
