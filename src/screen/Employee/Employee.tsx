import ValidationError from '@/components/feedback/ValidationError';
import { Button, Input } from '@/components/inputs';
import Checkbox from '@/components/inputs/Checkbox';
import EnglishDatePicker from '@/components/inputs/EnglishDatePicker';
import { Select } from '@/components/inputs/Select';
import Header from '@/components/layout/Header';
import { routePaths } from '@/routes/routes';
import { GENDER_TYPE, ROLE_TYPE } from '@/utils/constants';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { employeeInitialValue, employeeValidationSchema } from './employee.schema';
import { useEmployeeCreator, useEmployeeDetail } from './employeeQueries';

export default function Employee() {
  const { id } = useParams();
  const { mutateAsync: employeeCreator, isLoading: loading } = useEmployeeCreator();
  const { data: employeeDetail } = useEmployeeDetail(id);

  const [formData, setFormData] = useState<IEmployeeValues>(employeeInitialValue);
  const navigate = useNavigate();
  useEffect(() => {
    if (employeeDetail) {
      setFormData({
        ...employeeDetail,
        middleName: employeeDetail.middleName ?? '',
        isBillable: employeeDetail.billableHours > 0 ? true : false
      });
    }
  }, [employeeDetail]);

  const form = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: employeeValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const requestData: IEmployeeRequestData = { ...values };
      console.log(requestData);
      const response = await employeeCreator(requestData);

      if (response.status === 200) {
        resetForm();
        navigate(routePaths.dashboard);
      }
    }
  });
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = form;

  const setWorkEndTime = (time: string) => {
    if (time) {
      const minEndTime = new Date(time);
      minEndTime.setMinutes(minEndTime.getMinutes() + 1);
      return minEndTime;
    } else {
      return undefined;
    }
  };

  return (
    <main className="app-main-layout">
      <Header />
      <div className="position-relative flex-grow-1">
        <div className="app-absolute-layout scrollable">
          <div className="container">
            <h2 className="title py-3">Add Employee</h2>
            <div className="row">
              <div className="col-lg-3">
                <h5 className="heading">Basic Information</h5>
              </div>
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-4 mb-3">
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
                  <div className="col-lg-4 mb-3">
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
                  <div className="col-lg-4 mb-3">
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
                  <div className="col-lg-4 mb-3">
                    <EnglishDatePicker
                      value={values.dob}
                      name="dob"
                      placeholderText="MM/DD/YYYY"
                      onChange={(date) => setFieldValue('dob', date)}
                      onBlur={handleBlur('dob')}
                      label="Birth Date"
                      className="form-control"
                    />
                    <ValidationError name="dob" errors={errors} touched={touched} />
                  </div>

                  <div className="col-lg-4 mb-3">
                    <Select
                      options={GENDER_TYPE}
                      value={values.gender}
                      label="Gender"
                      placeholder="Choose Gender"
                      onBlur={handleBlur('gender')}
                      onChange={(value) => setFieldValue('gender', value)}
                    />
                    <ValidationError name="gender" errors={errors} touched={touched} />
                  </div>
                  <div className="col-lg-4 mb-3">
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
                  <div className="col-lg-4 mb-3">
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
                  <div className="col-lg-4 mb-3">
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
                <div className="form-divider"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <h5 className="heading">Working Hours</h5>
              </div>
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-4 mb-3">
                    <EnglishDatePicker
                      value={values.workStartAt}
                      onChange={(date) => setFieldValue('workStartAt', date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Time"
                      label="Starts At"
                      className="form-control"
                      dateFormat="h:mm aa"
                      onBlur={handleBlur('workStartAt')}
                    />
                    <ValidationError name="workStartAt" errors={errors} touched={touched} />
                  </div>
                  <div className="col-lg-4 mb-3">
                    <EnglishDatePicker
                      value={values.workEndAt}
                      onChange={(date) => setFieldValue('workEndAt', date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Time"
                      label="Ends At"
                      className="form-control"
                      dateFormat="h:mm aa"
                      minTime={setWorkEndTime(values.workStartAt)}
                      maxTime={new Date(0, 0, 0, 23, 59)}
                      onBlur={handleBlur('workEndAt')}
                    />
                    <ValidationError name="workEndAt" errors={errors} touched={touched} />
                  </div>
                </div>
                <div className="form-divider"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <h5 className="heading">Jobs</h5>
              </div>
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-4 mb-3">
                    <Select
                      options={ROLE_TYPE}
                      value={values.role}
                      label="Job Position"
                      onBlur={handleBlur('role')}
                      onChange={(value) => setFieldValue('role', value)}
                    />
                    <ValidationError name="role" errors={errors} touched={touched} />
                  </div>
                  <div className="col-lg-4 mb-3">
                    <Select
                      options={GENDER_TYPE}
                      value={values.team}
                      label="Team"
                      onBlur={handleBlur('team')}
                      onChange={(value) => setFieldValue('team', value)}
                    />
                    <ValidationError name="team" errors={errors} touched={touched} />
                  </div>
                </div>
                <div className="form-divider"></div>
              </div>
            </div>
            <div className="row pb-3">
              <div className="col-lg-3">
                <h5 className="heading">Billable Information</h5>
              </div>
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-4">
                    <Checkbox
                      checked={values.isBillable}
                      defaultChecked={values.isBillable}
                      label="This user is billable"
                      onChange={handleChange('isBillable')}
                    />
                    <Input
                      value={values.billableHours}
                      name="billableHours"
                      label="Billable Hours"
                      disabled={!values.isBillable}
                      placeholder="Enter Billable Hours"
                      onChange={handleChange('billableHours')}
                      onBlur={handleBlur('billableHours')}
                      type="number"
                      hasError={!!errors.billableHours && touched.billableHours}
                    />
                    <ValidationError name="billableHours" errors={errors} touched={touched} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-footer">
        <Button color="secondary" loading={loading} onClick={() => handleSubmit()}>
          Save
        </Button>
      </div>
    </main>
  );
}
