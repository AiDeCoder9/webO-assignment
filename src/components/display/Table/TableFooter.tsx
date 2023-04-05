import { PaginationState, RowData, Table } from '@tanstack/react-table';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { getPageNumbers, paginationRowOpt } from './table-util';

interface ITableFooterProps<TData> {
  table: Table<TData>;
  pagination?: PaginationState;
  paginationServer?: boolean;
  paginationRowsPerPageOptions?: Array<number>;
}

const TableFooter = <TData extends RowData>({
  table,
  pagination,
  paginationServer,
  paginationRowsPerPageOptions = paginationRowOpt
}: ITableFooterProps<TData>) => {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageSize = paginationServer
    ? pagination?.pageSize || 10
    : table.getState().pagination.pageSize;
  const total = paginationServer
    ? table.getPageCount() * (pagination?.pageSize || 10)
    : table.getPrePaginationRowModel().rows.length;

  const pageNumbers = getPageNumbers({
    currentPage,
    pageSize,
    total
  });

  const handleDotPageChange = (i: number) => {
    const isSecondlastIdx = pageNumbers[pageNumbers.length - 2] === '...';
    const pageIndex = isSecondlastIdx ? (pageNumbers[pageNumbers.length - 1] as number) - 2 : i;
    table.setPageIndex(pageIndex);
  };

  return (
    <div className="table-footer">
      <div>
        <select
          className="form-select"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}>
          {paginationRowsPerPageOptions.map((pageSizeOpt) => (
            <option key={pageSizeOpt} value={pageSizeOpt}>
              {pageSizeOpt} per page
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex align-items-center justify-content-center">
        <button
          type="button"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className={
            !table.getCanPreviousPage() ? 'cursor-not-allowed mr-2 btn' : 'cursor-pointer mr-2 btn'
          }>
          <RxCaretLeft size={24} className="text-gray-600  " />
        </button>

        <div className="d-flex">
          {pageNumbers.map((pageNumber, i) =>
            pageNumber === '...' ? (
              <button
                type="button"
                onClick={() => {
                  handleDotPageChange(i);
                }}
                className="btn"
                key={pageNumber}>
                &hellip;
              </button>
            ) : (
              <div key={pageNumber}>
                {pageNumber === table.getState().pagination.pageIndex + 1 ? (
                  <button type="button" className="btn btn-secondary">
                    {pageNumber}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => table.setPageIndex((pageNumber as number) - 1)}>
                    {pageNumber}
                  </button>
                )}
              </div>
            )
          )}
        </div>
        <button
          type="button"
          onClick={() => table.nextPage()}
          className={
            !table.getCanNextPage() ? 'btn cursor-not-allowed mr-2 ' : 'btn cursor-pointer mr-2 '
          }
          disabled={!table.getCanNextPage()}
          data-testid="next-page">
          <RxCaretRight size={24} className="text-gray-600  " />
        </button>

        <span className="table-entries">{`Showing ${currentPage} to ${pageSize} of ${total} entries`}</span>
      </div>
    </div>
  );
};

export default TableFooter;
