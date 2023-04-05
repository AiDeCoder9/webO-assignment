import Button from '../../inputs/Button';
import { flexRender, HeaderGroup, RowData } from '@tanstack/react-table';

interface ITableHeaderProps<TData> {
  headerGroup: () => HeaderGroup<TData>[];
}

const TableHeader = <TData extends RowData>({ headerGroup }: ITableHeaderProps<TData>) => {
  return (
    <thead className="border-y-gray-300  border-y-2  ">
      {headerGroup().map((headerContent) => (
        <tr key={headerContent.id}>
          {headerContent.headers.map((header) => {
            return (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                  <Button
                    type="button"
                    className={
                      header.column.getCanSort() ? 'btn cursor-pointer select-none' : 'btn'
                    }
                    onClick={header.column.getToggleSortingHandler()}
                    data-testid="column">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽'
                    }[header.column.getIsSorted() as string] ?? null}
                  </Button>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
