import { TableNoDataFound } from './NoDataFound';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import { fuzzyFilter } from './table-util';

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  RowSelectionState,
  SortingState,
  SortingTableState,
  useReactTable
} from '@tanstack/react-table';

import * as React from 'react';
import { useVirtual } from 'react-virtual';
import SearchInput from '@/components/inputs/SearchInput';
import classNames from 'classnames';

interface ITableProps<TData extends RowData> extends Partial<SortingTableState> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading: boolean;
  paginationRowsPerPageOptions?: number[];
  rowSelection?: RowSelectionState;
  setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
  striped?: boolean;
  bordered?: boolean;
  action?: React.ReactElement;
}

const Table = <TData extends RowData>({
  data,
  columns,
  isLoading,
  paginationRowsPerPageOptions,
  rowSelection,
  setRowSelection,
  setSorting,
  sorting,
  striped = false,
  bordered = false,
  action
}: ITableProps<TData>) => {
  const [tableSorting, tableSetSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const memorizedData = React.useMemo(() => data, [data]);
  const memoizedColumns = React.useMemo(() => columns, [columns]);

  const table = useReactTable({
    data: memorizedData,
    columns: memoizedColumns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      sorting: sorting || tableSorting,
      rowSelection: rowSelection || undefined,
      columnFilters,
      globalFilter
    },
    onSortingChange: setSorting || tableSetSorting,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection || undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    enableGlobalFilter: true,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false
  });

  const isNoDataFound = !isLoading && table.getRowModel().rows?.length === 0;
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  console.log(rows, 'rows');
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

  return (
    <div
      ref={tableContainerRef}
      className={classNames('table table-container', {
        'table-striped': striped,
        'table-bordered': bordered
      })}>
      <div className="d-flex justify-content-between align-items-center m-3">
        <SearchInput
          type="text"
          onChange={(e) => {
            setGlobalFilter(e.target.value);
          }}
          value={globalFilter ?? ''}
          placeholder="Search"
        />
        {action}
      </div>

      <div className="table">
        <table>
          <TableHeader headerGroup={table.getHeaderGroups} />
          {isNoDataFound && <TableNoDataFound />}
          {isLoading && <div>Loading ....</div>}
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

      <TableFooter table={table} paginationRowsPerPageOptions={paginationRowsPerPageOptions} />
    </div>
  );
};

export default Table;
