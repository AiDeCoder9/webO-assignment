import ValidationError from '@/components/feedback/ValidationError';
import { Input } from '@/components/inputs';
import EnglishDatePicker from '@/components/inputs/EnglishDatePicker';
import { Select } from '@/components/inputs/Select';
import Header from '@/components/layout/Header';
import { GENDER_TYPE, ROLE_TYPE } from '@/utils/constants';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { employeeInitialValue, employeeValidationSchema } from './employee.schema';

export default function Employee() {
  const [formData, setFormData] = useState<IEmployeeValues>(employeeInitialValue);
  const form = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: employeeValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values, resetForm);
      setFormData(values);
    }
  });
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = form;
  console.log(handleSubmit, setFieldValue);
  return (
    <main className="app-main-layout">
      <Header />
      <div className="position-relative flex-grow-1">
        <div className="app-absolute-layout scrollable">
          <div className="container">
            <h2 className="title py-3">Add Employee</h2>
            <div className="row">
              <div className="col-lg-3">
                <h3>Basic Information</h3>
              </div>
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <Input
                      value={values.name}
                      name="name"
                      label="Name"
                      placeholder="Enter Name"
                      onChange={handleChange('name')}
                      onBlur={handleBlur('name')}
                      hasError={!!errors.name && touched.name}
                    />
                    <ValidationError name="name" errors={errors} touched={touched} />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <Input
                      name="middleName"
                      value={values.middleName}
                      label="Middle Name"
                      placeholder="Enter Middle Name"
                      onChange={handleChange('middleName')}
                      onBlur={handleBlur('middleName')}
                      hasError={!!errors.middleName && touched.middleName}
                    />
                    <ValidationError name="middleName" errors={errors} touched={touched} />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <Input
                      name="surname"
                      value={values.surname}
                      label="Surname"
                      placeholder="Enter Surname"
                      onChange={handleChange('surname')}
                      onBlur={handleBlur('surname')}
                      hasError={!!errors.surname && touched.surname}
                    />
                    <ValidationError name="surname" errors={errors} touched={touched} />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <Input
                      name="dob"
                      value={values.dob}
                      label="Birth Date"
                      placeholder="yyyy-mm-dd"
                      onChange={handleChange('dob')}
                      onBlur={handleBlur('dob')}
                      hasError={!!errors.dob && touched.dob}
                    />
                    <EnglishDatePicker
                      value={values.dob}
                      onChange={(date) => setFieldValue('dob', date)}
                      handleChange={handleChange('dob')}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Time"
                    />
                    <ValidationError name="dob" errors={errors} touched={touched} />
                  </div>

                  <div className="col-lg-4 mb-4">
                    <Select
                      options={GENDER_TYPE}
                      value={values.gender}
                      label="Gender"
                      onBlur={handleBlur('gender')}
                      onChange={(value) => setFieldValue('gender', value)}
                    />
                    <ValidationError name="gender" errors={errors} touched={touched} />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <Select
                      options={GENDER_TYPE}
                      value={values.team}
                      label="Team"
                      onBlur={handleBlur('team')}
                      onChange={(value) => setFieldValue('team', value)}
                    />
                    <ValidationError name="team" errors={errors} touched={touched} />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <Select
                      options={ROLE_TYPE}
                      value={values.role}
                      label="Role"
                      onBlur={handleBlur('role')}
                      onChange={(value) => setFieldValue('role', value)}
                    />
                    <ValidationError name="role" errors={errors} touched={touched} />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <Input
                      name="address"
                      value={values.address}
                      label="Address"
                      placeholder="Enter Address"
                      onChange={handleChange('address')}
                      onBlur={handleBlur('address')}
                      hasError={!!errors.address && touched.address}
                    />
                    <ValidationError name="address" errors={errors} touched={touched} />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <Input
                      name="mobile"
                      value={values.mobile}
                      label="Mobile No."
                      placeholder="98********"
                      onChange={handleChange('mobile')}
                      onBlur={handleBlur('mobile')}
                      hasError={!!errors.mobile && touched.mobile}
                    />
                    <ValidationError name="mobile" errors={errors} touched={touched} />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <Input
                      name="email"
                      value={values.email}
                      label="Email Address"
                      placeholder="john@yopmail.com"
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                      hasError={!!errors.email && touched.email}
                    />
                    <ValidationError name="email" errors={errors} touched={touched} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
