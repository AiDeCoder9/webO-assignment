import React from 'react';

interface INoDataFound {
  label?: string;
  columnsLength?: number;
}
export const TableNoDataFound: React.FC<INoDataFound> = ({
  label = 'There are no records to display',
  columnsLength = 0
}) => {
  return (
    <tbody>
      <tr>
        <td colSpan={columnsLength} className="text-center">
          {label}
        </td>
      </tr>
    </tbody>
  );
};
