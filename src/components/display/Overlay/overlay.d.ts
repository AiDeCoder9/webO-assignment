interface OverlayProps {
  children?: React.ReactNode;
  toggle: () => void;
  isOpen?: boolean;
  title: string;
}
