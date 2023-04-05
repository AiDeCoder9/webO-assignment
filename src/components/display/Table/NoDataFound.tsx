import React from 'react';

interface INoDataFound {
  label?: string;
}
export const TableNoDataFound: React.FC<INoDataFound> = ({
  label = 'There are no records to display'
}) => {
  return <div>{label}</div>;
};
