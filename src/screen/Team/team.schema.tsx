import { Button } from '@/components/inputs';
import { routePaths } from '@/routes/routes';
import { sanitizeURL } from '@/utils/sanitize-url';
import { Row } from '@tanstack/react-table';
import { useMemo } from 'react';
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
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

export const useTeamColumn = () => {
  const navigate = useNavigate();
  return useMemo(() => {
    const column = [
      {
        header: () => <span>ID</span>,
        accessor: 'id',
        accessorFn: (row: ITeamRequestData) => row.id,
        id: 'id'
      },

      {
        header: () => <span>Current Team</span>,
        accessor: 'team',
        accessorFn: (row: ITeamRequestData) => row.name,
        id: 'team'
      },
      {
        header: () => <span>Members</span>,
        accessor: 'members',
        accessorFn: (row: ITeamRequestData) => row.members.map((item) => item.label),
        id: 'members'
      },

      {
        header: () => <span>Billable Hours</span>,
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
              <Button
                className="view"
                onClick={() =>
                  row.original.id &&
                  navigate(sanitizeURL(routePaths.employeeUpdate, { id: row.original.id }))
                }>
                <AiFillEye size={16} />
              </Button>
              <Button className="mx-3 edit">
                <AiFillEdit
                  size={16}
                  onClick={() =>
                    row.original.id &&
                    navigate(sanitizeURL(routePaths.employeeUpdate, { id: row.original.id }))
                  }
                />
              </Button>
              <Button className="delete">
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
