import { Button } from '@/components/inputs';
import { routePaths } from '@/routes/routes';
import { sanitizeURL } from '@/utils/sanitize-url';
import { formatTeamMembers } from '@/utils/transformer';
import { Row } from '@tanstack/react-table';
import { useMemo } from 'react';
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTeamRemove } from './teamQueries';
export const teamValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Team Name is Required')
    .matches(/^[aA-zZ\s]+$/, 'Only Characters are allowed.')
    .min(2, 'Minimum 2 characters required')
    .max(100, 'Maximum 100 characters allowed'),

  password: yup
    .string()
    .required('Password required')
    .min(8, 'Minimum 8 characters required')
    .max(100, 'Maximum 100 characters allowed'),

  members: yup.array().nullable().required('Please select the members.'),
  billableHours: yup.number().min(10, 'Minimum 10hr').required('Billable Hours is required')
});

export const teamInitialValue: ITeamValues = {
  name: '',
  password: '',
  members: null,
  billableHours: 0
};

export const useTeamColumn = (actions: TableAction<ITeamRequestData>) => {
  const navigate = useNavigate();
  const { view } = actions;
  const { mutateAsync: removeTeam, isLoading } = useTeamRemove();
  const handleDelete = async (id: string | undefined) => {
    if (id) await removeTeam(id);
  };
  return useMemo(() => {
    const column = [
      {
        header: () => <span>Team Name</span>,
        accessor: 'team',
        accessorFn: (row: ITeamRequestData) => row.name,
        id: 'team'
      },
      {
        header: () => <span>QR Code</span>,
        accessor: 'password',
        cell: ({ row }: { row: Row<ITeamRequestData> }) => {
          return (
            <QRCode
              size={40}
              value={`Team '${row.original.name}' password is '${row.original.password}'`}
            />
          );
        },
        id: 'password'
      },

      {
        header: () => <span>Members</span>,
        accessor: 'members',
        accessorFn: (row: ITeamRequestData) => formatTeamMembers(row.members),
        id: 'members'
      },

      {
        header: () => <span>Total Man Hours</span>,
        accessor: 'billableHours',
        accessorFn: (row: ITeamRequestData) =>
          row.billableHours ? `${row.billableHours} hours/week` : 'NA',
        id: 'billableHours'
      },
      {
        header: () => <span>Actions</span>,
        accessorKey: 'actions',
        cell: ({ row }: { row: Row<ITeamRequestData> }) => {
          return (
            <div className="table-actions">
              <Button className="view" onClick={() => view(row.original)}>
                <AiFillEye size={16} />
              </Button>
              <Button
                className="mx-3 edit"
                onClick={() =>
                  row.original.id &&
                  navigate(sanitizeURL(routePaths.teamUpdate, { id: row.original.id }))
                }>
                <AiFillEdit size={16} />
              </Button>
              <Button
                loading={isLoading}
                onClick={() => handleDelete(row.original.id)}
                className="delete">
                <AiFillDelete size={16} />
              </Button>
            </div>
          );
        }
      }
    ];

    return column;
  }, [navigate]);
};
