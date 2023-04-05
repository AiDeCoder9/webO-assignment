import { TableNoDataFound } from './NoDataFound';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  SortingTableState,
  useReactTable
} from '@tanstack/react-table';

import * as React from 'react';
import { useVirtual } from 'react-virtual';
import classNames from 'classnames';

interface ITableProps<TData extends RowData> extends Partial<SortingTableState> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading: boolean;
  setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
  striped?: boolean;
  bordered?: boolean;
}

const Table = <TData extends RowData>({
  data,
  columns,
  isLoading,
  setSorting,
  sorting,
  striped = false,
  bordered = false
}: ITableProps<TData>) => {
  const [tableSorting, tableSetSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const memorizedData = React.useMemo(() => data, [data]);
  const memoizedColumns = React.useMemo(() => columns, [columns]);

  const table = useReactTable({
    data: memorizedData,
    columns: memoizedColumns,
    state: {
      sorting: sorting || tableSorting,
      columnFilters
    },
    onSortingChange: setSorting || tableSetSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,

    debugTable: false,
    debugHeaders: true,
    debugColumns: false
  });

  const isNoDataFound = !isLoading && table.getRowModel().rows?.length === 0;
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;
  //wconst total = table.getPrePaginationRowModel().rows.length;

  return (
    <div
      ref={tableContainerRef}
      className={classNames('table table-container', {
        'table-striped': striped,
        'table-bordered': bordered
      })}>
      <table>
        <TableHeader headerGroup={table.getHeaderGroups} />
        {isNoDataFound && <TableNoDataFound />}
        {isLoading && (
          <tbody>
            <tr>
              <td>Loading ....</td>
            </tr>
          </tbody>
        )}
        {!isNoDataFound && (
          <TableBody
            getRowModel={table.getRowModel}
            virtualRows={virtualRows}
            paddingBottom={paddingBottom}
            paddingTop={paddingTop}
          />
        )}
      </table>
    </div>
  );
};

export default Table;
