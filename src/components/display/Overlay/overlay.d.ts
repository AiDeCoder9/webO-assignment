interface OverlayProps<T> {
  children?: React.ReactNode;
  toggle: (data?: T) => void;
  isOpen?: boolean;
  title: string;
}
