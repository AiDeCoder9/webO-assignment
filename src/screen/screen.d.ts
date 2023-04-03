interface DetailScreenProps {
  isOpen: boolean;
  toggle: () => void;
  data: IData;
}

interface ILayoutProps {
  children: React.ReactNode;
  list: Array<IData> | undefined;
  loading: boolean;
  onItemPress: (data: IData) => void;
  type: 'spells' | 'monsters' | 'races';
  title: string;
}
interface ScreenWiseResponse extends BasicResponse {
  results: Array<IData>;
}
interface MockScreenProviderProps {
  children: React.ReactElement;
}
