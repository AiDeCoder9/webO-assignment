import { useMemo } from 'react';
import * as yup from 'yup';

export const employeeValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('First Name is Required')
    .matches(/^[aA-zZ\s]+$/, 'Only Characters are allowed.')
    .min(2, 'Minimum 2 characters required')
    .max(100, 'Maximum 255 characters allowed'),
  middleName: yup
    .string()
    .nullable()
    .matches(/^[aA-zZ\s]+$/, 'Only Characters are allowed.')
    .min(2, 'Minimum 2 characters required')
    .max(100, 'Maximum 255 characters allowed'),
  surname: yup
    .string()
    .required('Last Name is required')
    .matches(/^[aA-zZ\s]+$/, 'Only Characters are allowed.')
    .min(2, 'Minimum 2 characters required')
    .max(100, 'Maximum 255 characters allowed'),

  gender: yup.object().required('Gender is required'),
  team: yup.object().nullable(),
  role: yup.object().required('Job Position is required'),
  dob: yup.string().required('Birth Date is required'),
  address: yup
    .string()
    .required('Address is Required')
    .matches(/^[aA-zZ\s]+$/, 'Only Characters are allowed.')
    .min(2, 'Minimum 2 characters required')
    .max(100, 'Maximum 255 characters allowed'),
  mobile: yup
    .string()
    .required('Mobile No. is required')
    .length(10, 'Mobile No. must be of 10 digit')
    .matches(/(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7}/, 'Enter valid mobile no.'),
  email: yup.string().required('Email is required').email('Enter valid email'),
  workStartAt: yup.string().required('Starting time is required'),
  workEndAt: yup.string().required('End time is required'),
  isBillable: yup.boolean(),

  billableHours: yup.number().when('isBillable', {
    is: true,
    then: () => yup.number().min(10, 'Minimum 10hr').required('Billable Hours is required')
  })
});

export const employeeInitialValue: IEmployeeValues = {
  name: '',
  middleName: '',
  surname: '',
  dob: '',
  gender: null,
  address: '',
  mobile: '',
  email: '',
  workStartAt: '',
  workEndAt: '',
  team: null,
  role: null,
  billableHours: 0,
  profileImage: null,
  isBillable: false
};

export const useEmployeeColumn = () => {
  return useMemo(() => {
    const column = [
      {
        header: () => <span>ID</span>,
        accessor: 'id',
        accessorFn: (row: IEmployeeRequestData) => row.id,
        id: 'id'
      },
      {
        header: () => <span>Full Name</span>,
        accessor: 'name',
        accessorFn: (row: IEmployeeRequestData) => `${row.name} ${row.middleName} ${row.surname}`,
        id: 'name'
      },
      {
        header: () => <span>Current Team</span>,
        accessor: 'team',
        accessorFn: (row: IEmployeeRequestData) => row.team?.label ?? 'Not Assigned',
        id: 'team'
      },
      {
        header: () => <span>Mobile No.</span>,
        accessor: 'mobile',
        accessorFn: (row: IEmployeeRequestData) => row.mobile,
        id: 'mobile'
      },
      {
        header: () => <span>Email Address</span>,
        accessor: 'email',
        accessorFn: (row: IEmployeeRequestData) => row.email,
        id: 'email'
      },
      {
        header: () => <span>Designation</span>,
        accessor: 'role',
        accessorFn: (row: IEmployeeRequestData) => row.role.value,
        id: 'role'
      },
      {
        header: () => <span>Billable Hours</span>,
        accessor: 'billableHours',
        accessorFn: (row: IEmployeeRequestData) =>
          row.isBillable ? `${row.billableHours} hours/week` : 'NA',
        id: 'billableHours'
      }
    ];

    return column;
  }, []);
};
