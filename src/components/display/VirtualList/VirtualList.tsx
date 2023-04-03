import { Spinner } from '@/components/feedback';
import classNames from 'classnames';
import { useRef } from 'react';
import { useVirtual } from 'react-virtual';

function VirtualList<T>(props: VirtualizedListProps<T>) {
  const {
    data,
    listEmptyComponent,
    renderItem,
    itemCount,
    contentStyle,
    loading = false,
    itemContainerStyle,
    containerStyle
  } = props;

  const CustomListEmptyComponent = listEmptyComponent;

  const parentRef = useRef<HTMLDivElement>(null);

  const { virtualItems, totalSize } = useVirtual({
    size: (itemCount ? itemCount : data?.length) || 0,
    parentRef
  });

  if (loading) {
    return <Spinner className="mt-3" />;
  }

  return (
    <div
      ref={parentRef}
      className={classNames(
        'scrollable h-100 w-100 overflow-auto app-absolute-layout',
        contentStyle
      )}>
      {data?.length > 0 ? (
        <div
          className={classNames('position-relative', containerStyle)}
          style={{ height: `${totalSize}px` }}>
          {virtualItems.map(({ index, start, measureRef }) => (
            <div
              role="listitem"
              className={classNames('position-absolute top-0 left-0', itemContainerStyle)}
              style={{ transform: `translateY(${start}px)` }}
              key={index}
              ref={measureRef}>
              {renderItem(data[index], index)}
            </div>
          ))}
        </div>
      ) : // list empty component
      CustomListEmptyComponent ? (
        <CustomListEmptyComponent />
      ) : (
        <h1>No Data Found</h1>
      )}
    </div>
  );
}

export default VirtualList;
