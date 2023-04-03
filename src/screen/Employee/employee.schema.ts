import * as yup from 'yup';

export const employeeValidationSchema = yup.object({
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
  role: yup.object().required('Role is required'),
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
  email: yup.string().required('Email is required').email('Enter valid email')
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
  position: null,
  team: null,
  role: null,
  billableHours: 0,
  profileImage: null
};
