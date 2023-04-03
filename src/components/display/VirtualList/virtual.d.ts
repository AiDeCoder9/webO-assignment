interface VirtualizedListProps<T> {
  // list of data to be virtualized
  data: Array<T>;
  loading?: boolean;
  // count of data, if not provided, length od data list is used
  itemCount?: number;
  // if the list has no data, this component is rendered
  listEmptyComponent?: React.ComponentType;
  // the rendered list item, default props of component are individual item and index of the item
  renderItem: (item: T, index: number) => React.ReactNode;

  // padding to be provided to the list
  contentStyle?: string;
  itemContainerStyle?: string;
  containerStyle?: string;
}
