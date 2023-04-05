import { Button } from '@/components/inputs';
import { routePaths } from '@/routes/routes';
import formatDate from '@/utils/format-date';
import { sanitizeURL } from '@/utils/sanitize-url';
import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'reactstrap';

export default function EmployeeDetail(props: IEmployeeRequestData) {
  const {
    name,
    billableHours,
    id,
    middleName,
    surname,
    email,
    role,
    mobile,
    address,

    workEndAt,
    workStartAt,
    isBillable
  } = props;
  const navigate = useNavigate();
  return (
    <div className="detail mt-4">
      <h6 className="title">{`${name} ${middleName} ${surname}`}</h6>
      <span className="text-dark small d-block mb-3">{email}</span>
      <Badge title="Team" className="d-inline-block h5" color="primary" pill>
        Employee
      </Badge>
      <div className="divider mt-4"></div>
      <div className="row">
        <div className="col-6">
          <div className="textbox">
            <p>Position</p>
            <span>{role.label}</span>
          </div>
        </div>
        <div className="col-6">
          <div className="textbox">
            <p>Contact</p>
            <span>{mobile}</span>
          </div>
        </div>
        <div className="col-6">
          <div className="textbox">
            <p>Address</p>
            <span>{address}</span>
          </div>
        </div>
      </div>
      <div className="divider mt-4"></div>
      <div className="row">
        <div className="col-6">
          <div className="textbox">
            <p>Start Date</p>
            <span>{formatDate(new Date(workStartAt))}</span>
          </div>
        </div>
        <div className="col-6">
          <div className="textbox">
            <p>Work End At</p>
            <span>{formatDate(new Date(workEndAt))}</span>
          </div>
        </div>
        <div className="col-6">
          <div className="textbox">
            <p>Billable Status</p>
            <span>{isBillable ? 'User is billable' : 'User is not billable'}</span>
          </div>
        </div>
        <div className="col-6">
          <div className="textbox">
            <p>Billable Hours</p>
            <span>{billableHours}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={() => id && navigate(sanitizeURL(routePaths.employeeUpdate, { id }))}
        className="btn-icon w-100 justify-content-center mt-4"
        size="lg">
        <AiFillEdit className="mr-2" /> Edit Employee
      </Button>
    </div>
  );
}
