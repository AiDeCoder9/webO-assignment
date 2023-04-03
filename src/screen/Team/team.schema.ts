import * as yup from 'yup';
export const teamValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('First Name is Required')
    .matches(/^[aA-zZ\s]+$/, 'Only Characters are allowed.')
    .min(2, 'Minimum 2 characters required')
    .max(100, 'Maximum 255 characters allowed'),

  password: yup
    .string()
    .required('Password required')
    .min(4, 'Minimum 4 characters required')
    .max(100, 'Maximum 255 characters allowed'),

  members: yup.array().nullable(),
  billableHours: yup.number().min(10, 'Minimum 10hr').required('Billable Hours is required')
});

export const teamInitialValue: ITeamValues = {
  name: '',
  password: '',
  members: null,
  billableHours: 0
};
