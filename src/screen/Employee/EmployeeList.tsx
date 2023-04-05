import Table from '@/components/display/Table/PaginatedTable';
import { Button } from '@/components/inputs';
import { routePaths } from '@/routes/routes';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployeeColumn } from './employee.schema';
import { useEmployeeList } from './employeeQueries';
import { IoMdAdd } from 'react-icons/io';
import Overlay from '@/components/display/Overlay/Overlay';
import EmployeeDetail from './EmployeeDetail';
export default function EmployeeList() {
  const [isOverlayOpen, setOverlay] = useState<boolean>(false);
  const [employeeDetail, setEmployeeDetail] = useState<IEmployeeRequestData | null>(null);
  const toggle = (data?: IEmployeeRequestData) => {
    setOverlay(!isOverlayOpen);
    if (data) setEmployeeDetail(data);
  };

  const { data: employList, isLoading: loading } = useEmployeeList();
  const columns = useEmployeeColumn({ view: toggle });
  const navigate = useNavigate();
  return (
    <>
      <Table
        data={employList || []}
        bordered={true}
        columns={columns}
        isLoading={loading}
        action={
          <Button className="btn-icon" onClick={() => navigate(routePaths.employee)}>
            <IoMdAdd color="#fff" /> Add Employee
          </Button>
        }
      />
      <Overlay toggle={toggle} isOpen={isOverlayOpen} title="Employee Information">
        {employeeDetail && <EmployeeDetail {...employeeDetail} />}
      </Overlay>
    </>
  );
}
