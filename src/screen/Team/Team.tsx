import { Button, Input } from '@/components/inputs';
import Header from '@/components/layout/Header';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { teamInitialValue, teamValidationSchema } from './team.schema';
import { useTeamCreator, useTeamDetail } from './teamQueries';
import ValidationError from '@/components/feedback/ValidationError';
import { Select } from '@/components/inputs/Select';
import { useEmployeeList } from '../Employee/employeeQueries';
import { optionTransform } from '@/utils/transformer';
import { routePaths } from '@/routes/routes';
import QRCode from 'react-qr-code';
import { IoMdDownload } from 'react-icons/io';

export default function Team() {
  const { id } = useParams();
  const { mutateAsync: teamCreator, isLoading: loading } = useTeamCreator();
  const { data: teamDetail } = useTeamDetail(id);
  const qrRef = useRef<any>(null);

  const [formData, setFormData] = useState<ITeamValues>(teamInitialValue);

  const { data: employeeList, isLoading: employeeLoading } = useEmployeeList();

  const navigate = useNavigate();

  useEffect(() => {
    if (teamDetail && id) {
      setFormData({
        ...teamDetail
      });
    }
  }, [teamDetail, id]);

  const form = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: teamValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values, 'check values');
      if (values.members) {
        const requestData: ITeamRequestData = { ...values, members: values.members };
        const response = await teamCreator({ ...requestData, members: values.members });
        if (response.status === 200 || 201) {
          resetForm();
          navigate(routePaths.dashboard);
        }
      }

      if (false) {
        resetForm();
      }
    }
  });
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = form;

  const downloadQRCode = (): void => {
    const svg = qrRef.current;
    if (!svg) return;

    const dataUrl = `data:image/svg+xml;base64,${btoa(svg.outerHTML)}`;
    const link = document.createElement('a');
    link.download = 'qrcode.svg';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (values.members && employeeList) {
      const billableHours = values.members.reduce((acc: number, current: OptionType) => {
        console.log(acc, current);
        const item = employeeList.find((element) => element.id === current.value)?.billableHours;
        if (item) return acc + item;
        return acc + 0;
      }, 0);
      setFieldValue('billableHours', billableHours);
    }
  }, [values.members, employeeList, setFieldValue]);

  return (
    <main className="app-main-layout">
      <Header />
      <div className="position-relative flex-grow-1">
        <div className="app-absolute-layout scrollable">
          <div className="container">
            <h2 className="title py-3">Add Team</h2>
            <div className="form-container">
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
                        type={'password'}
                        placeholder="*********"
                        onChange={handleChange('password')}
                        onBlur={handleBlur('password')}
                        hasError={!!errors.password && touched.password}
                      />
                      <ValidationError name="password" errors={errors} touched={touched} />
                    </div>
                  </div>
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

              <div className="row">
                <div className="col-lg-3">
                  <h5 className="heading">QR Code</h5>
                </div>
                <div className="col-lg-9">
                  <div className="d-flex align-items-center">
                    <div>
                      <QRCode
                        ref={qrRef}
                        value={`Team '${values.name}' password is '${values.password}'`}
                        size={120}
                      />
                    </div>

                    <Button outline color="success" className="ml-3" onClick={downloadQRCode}>
                      <IoMdDownload className="mr-1" size={16} />
                      Download
                    </Button>
                  </div>

                  <div className="form-divider"></div>
                </div>
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
