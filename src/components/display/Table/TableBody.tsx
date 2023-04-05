import { flexRender, Row, RowData, RowModel } from '@tanstack/react-table';
import { VirtualItem } from 'react-virtual';

interface ITableBodyProps<TData> {
  getRowModel: () => RowModel<TData>;
  paddingTop?: number;
  virtualRows?: VirtualItem[];
  paddingBottom?: number;
}

const TableBody = <TData extends RowData>({
  getRowModel,
  virtualRows,
  paddingTop,
  paddingBottom
}: ITableBodyProps<TData>) => {
  const { rows } = getRowModel();
  if (Array.isArray(virtualRows)) {
    return (
      <tbody className="overflow-y-scroll h-screen ">
        {paddingTop && paddingTop > 0 ? (
          <tr>
            <td style={{ height: `${paddingTop}px` }} />
          </tr>
        ) : null}
        {virtualRows.map((virtualRow: { index: number }) => {
          const row = rows[virtualRow.index] as Row<TData>;
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                );
              })}
            </tr>
          );
        })}
        {paddingBottom && paddingBottom > 0 ? (
          <tr>
            <td style={{ height: `${paddingBottom}px` }} />
          </tr>
        ) : null}
      </tbody>
    );
  }
  return (
    <tbody>
      {getRowModel().rows.map((row, idx) => {
        return (
          <tr key={row.id} className={idx % 2 ? 'bg-gray-100' : 'bg-white'}>
            {row.getVisibleCells().map((cell) => {
              return (
                <td
                  className="px-6 py-2 whitespace-nowrap text-sm  text-cool-gray-800"
                  key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
