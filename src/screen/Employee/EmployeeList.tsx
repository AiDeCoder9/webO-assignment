import Table from '@/components/display/Table/PaginatedTable';
import { Button } from '@/components/inputs';
import { routePaths } from '@/routes/routes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployeeColumn } from './employee.schema';
import { useEmployeeList } from './employeeQueries';
import { IoMdAdd } from 'react-icons/io';
export default function EmployeeList() {
  const { data: employList, isLoading: loading } = useEmployeeList();
  const columns = useEmployeeColumn();
  const navigate = useNavigate();
  return (
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
  );
}
