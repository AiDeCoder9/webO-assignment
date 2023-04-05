import React from 'react';
import { useTeamList } from './teamQueries';
import Table from '@/components/display/Table/PaginatedTable';
import { useTeamColumn } from './team.schema';
import { Button } from '@/components/inputs';
import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '@/routes/routes';
export default function TeamList() {
  const columns = useTeamColumn();
  const { data: teamList, isLoading: loading } = useTeamList();
  const navigate = useNavigate();
  return (
    <Table
      data={teamList || []}
      bordered
      columns={columns}
      isLoading={loading}
      action={
        <Button className="btn-icon" onClick={() => navigate(routePaths.employee)}>
          <IoMdAdd color="#fff" /> Add Team
        </Button>
      }
    />
  );
}
