import { Button, Input } from '@/components/inputs';
import Header from '@/components/layout/Header';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { teamInitialValue, teamValidationSchema } from './team.schema';
import { useTeamCreator, useTeamDetail } from './teamQueries';
import ValidationError from '@/components/feedback/ValidationError';
import { Select } from '@/components/inputs/Select';
import { useEmployeeList } from '../Employee/employeeQueries';
import { optionTransform } from '@/utils/transformer';

export default function Team() {
  const { id } = useParams();
  const { mutateAsync: teamCreator, isLoading: loading } = useTeamCreator();
  const { data: teamDetail } = useTeamDetail(id);

  const [formData, setFormData] = useState<ITeamValues>(teamInitialValue);
  console.log(teamDetail, teamCreator, setFormData);

  const { data: employeeList, isLoading: employeeLoading } = useEmployeeList();

  console.log(optionTransform(employeeList), employeeList, 'hoola');

  const form = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: teamValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      if (false) {
        resetForm();
      }
    }
  });
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = form;
  console.log(employeeList);
  return (
    <main className="app-main-layout">
      <Header />
      <div className="position-relative flex-grow-1">
        <div className="app-absolute-layout scrollable">
          <div className="container">
            <h2 className="title py-3">Add Team</h2>
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
                      label="Team Name"
                      placeholder="Enter Name"
                      onChange={handleChange('name')}
                      onBlur={handleBlur('name')}
                      hasError={!!errors.name && touched.name}
                    />
                    <ValidationError name="name" errors={errors} touched={touched} />
                  </div>
                  <div className="col-lg-4 mb-3">
                    <Input
                      name="password"
                      value={values.password}
                      label="Team Password"
                      placeholder="*********"
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                      hasError={!!errors.password && touched.password}
                    />
                    <ValidationError name="password" errors={errors} touched={touched} />
                  </div>
                </div>
                <div className="form-divider"></div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3">
                <h5 className="heading">Members</h5>
              </div>
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-4 mb-3">
                    <Select
                      options={optionTransform(employeeList ?? [])}
                      isMulti
                      isMultiCheckbox
                      isLoading={employeeLoading}
                      value={values.members}
                      label="Team Members"
                      placeholder="Choose Members"
                      onBlur={handleBlur('members')}
                      onChange={(value) => {
                        console.log(value, 'kkkk');
                        setFieldValue('members', value);
                      }}
                    />
                    <ValidationError name="members" errors={errors} touched={touched} />
                  </div>
                  <div className="col-lg-4 mb-3">
                    <Input
                      value={values.billableHours}
                      name="billableHours"
                      label="Billable Hours"
                      readOnly
                      placeholder="Enter Billable Hours"
                      onChange={handleChange('billableHours')}
                      onBlur={handleBlur('billableHours')}
                      type="number"
                      hasError={!!errors.billableHours && touched.billableHours}
                    />
                    <ValidationError name="billableHours" errors={errors} touched={touched} />
                  </div>
                </div>
                <div className="form-divider"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-footer">
        <Button color="secondary" loading={loading} onClick={() => handleSubmit()}>
          {id ? 'Update' : 'Save'}
        </Button>
      </div>
    </main>
  );
}
